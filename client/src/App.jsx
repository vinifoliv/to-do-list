import { useState, useEffect, Suspense } from 'react';
import './App.css';
import Login from './components/Login'
import Filtro from './components/Filtro';
import Formulario from './components/Formulario';
import Tarefa from './components/Tarefa';

export default function App () {
    const DOMAIN = 'http://localhost:9000';

    // Hooks ----------------------------------------------------------------------------------------------------
    const [ tarefas, setTarefas ] = useState([]);                   // Conjunto de todas as tarefas
    const [ tarefasFiltradas, setTarefasFiltradas ] = useState([]); // Tarefas a serem renderizadas
    const [ tipoAExibir, setTipoAExibir ] = useState('todas');      // Altera quais as tarefas a serem renderizadas
    const [ logado, setLogado ] = useState(false);                  // Define a interface à qual o usuário tem acesso: login ou app
    const [ token, setToken ] = useState('');                       // Guarda o JWT após login/cadastro

    // Carrega as tarefas do banco feito o login/cadastro
    useEffect(() => {
        if (logado) consultarTarefas();
    }, [logado]);

    // Altera a exibição se 1. as tarefas forem atualizadas numa consulta ao banco e 2. o usuário alterar o tipo a exibir
    useEffect(() => {
        if (logado) alterarExibicao();
    }, [ tarefas, tipoAExibir ]);

    // Markup ---------------------------------------------------------------------------------------------------
    if (!logado) return (<Login logar={logar}/>);
    else {
        return (
            <div className="card">

                {/* Titulo */}
                <h1>Bem-vindo</h1>

                {/* Formulario */}
                <h3>Insira aqui a sua tarefa</h3>
                <Formulario adicionarTarefa={adicionarTarefa}/> <br />

                {/* Carrossel com as tarefas*/}
                <h3>Suas tarefas</h3>

                <div className="carrosel">
                    <Filtro onClick={(tipo) => setTipoAExibir(tipo)}/>
                    <Suspense fallback={ <h4>Carregando as suas tarefas...</h4> }>
                        {
                            tarefasFiltradas.map((tarefa) => 
                                <Tarefa dados={tarefa} alterarTarefa={alterarTarefa} removerTarefa={removerTarefa} />
                            ) 
                        }
                    </Suspense>
                </div>

            </div>
        );
    }

    // Helper functions -----------------------------------------------------------------------------------------

    // Feito o login/cadastro, define o token e altera a interface
    function logar(token) {
        setToken(token);
        setLogado(true);
    }

    // Altera o array de tarefas a serem renderizadas com base no tipo a exibir
    function alterarExibicao() {
        let arrayAuxiliar = [];

        switch (tipoAExibir) {
            case 'todas':
                setTarefasFiltradas(tarefas);
                break;
            
            case 'pendentes':
                tarefas.forEach((tarefa) => {
                    if (!tarefa['completa'])
                        arrayAuxiliar.push(tarefa);
                });

                setTarefasFiltradas(arrayAuxiliar);
                break;
            
            case 'concluidas':
                tarefas.forEach((tarefa) => {
                    if (tarefa['completa'])
                        arrayAuxiliar.push(tarefa);
                });

                setTarefasFiltradas(arrayAuxiliar);
                break;
            
            default:
                alert('Erro ao filtrar tarefas: tipo de tarefa desconhecido.');
                break;
        }
    }

    // Valida os campos do formulário e retorna um objeto com os dados da tarefa
    function montarTarefaParaInclusao() {
        let titulo = document.getElementById('titulo-tarefa').value;
        let data = document.getElementById('vencimento').value;
        let descricao = document.getElementById('descricao').value;

        return {
            titulo: titulo,
            vencimento: data,
            completa: false,
            descricao: descricao
        }
    }

    // Valida os campos da tarefa e retorna um objeto com os seus dados
    function montarTarefaParaAlteracao(id) {
        let titulo = document.getElementById(id + '-titulo-tarefa').value;
        let data = document.getElementById(id + '-data').value;
        let completa = document.getElementById(id + '-checkbox').checked;
        let descricao = document.getElementById(id + '-descricao').value;

        return {
            titulo: titulo,
            vencimento: data,
            completa: completa,
            descricao: descricao,
            id: id
        }
    }

    // Limpa o formulário de adição de tarefas
    function limparFormulario() {
        document.getElementById('titulo-tarefa').value = '';
        document.getElementById('vencimento').value = '';
        document.getElementById('descricao').value = '';
    }


    // Requisições à API ----------------------------------------------------------------------------------------
    
    // Adiciona uma tarefa no banco de dados
    async function adicionarTarefa() {
        let tarefa = montarTarefaParaInclusao();

        if (!tarefa) return; // Se houve erro ao montar a tarefa, ele não prossegue para a requisição

        // Definindo as configurações
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarefa)
        }

        // Requisição
        fetch(DOMAIN + '/adicionar-tarefa', options)

        .then(async (response) => {
            if (response.ok) {
                alert("Tarefa adicionada com sucesso!");
                limparFormulario();
                await consultarTarefas();
            }
            else {
                limparFormulario();
                const message = await response.text();
                throw new Error(message);
            }
        })
        .catch(error => {
            alert("Erro ao adicionar tarefa: " + error);
        });
    }

    // Consulta todas as tarefas do usuario e altera o tipo de exibição
    async function consultarTarefas() { 
        // Configurações da requisição
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        fetch(DOMAIN + '/consultar-tarefas', options)

        .then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setTarefas(data);
                alterarExibicao();
            }
            else {
                const message = await response.text();
                throw new Error(message);
            }
        })

        .catch((error) => {
            alert('Erro ao consultar suas tarefas: ' + error);
        });
    }   

    // Altera uma tarefa
    async function alterarTarefa(id) {
        let tarefa = montarTarefaParaAlteracao(id);

        if (!tarefa) return; // Se houve erro ao montar a tarefa, ele não prossegue para a requisição

        // Configurações da requisição
        const options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarefa)
        }

        fetch(DOMAIN + '/alterar-tarefa', options)

        .then(async (response) => {
            if (response.ok) {
                alert('Tarefa alterada com sucesso!')
                await consultarTarefas();
            }
            else {
                await consultarTarefas();
                const message = await response.text();
                throw new Error(message);
            }
        })

        .catch((error) => {
            alert('Erro ao alterar a tarefa: ' + error);
        });
    }

    // Remove uma tarefa
    async function removerTarefa(id) {
        const options = {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        }

        fetch(DOMAIN + '/remover-tarefa/' + id, options)

        .then(async (response) => {
            if (response.ok) {
                alert('Tarefa removida com sucesso!');
                await consultarTarefas();
            }
            else {
                const message = await response.text();
                throw new Error(message);
            }
        })

        .catch((error) => {
            alert('Não foi possível remover a tarefa: ' + error);
        });
    }
}   