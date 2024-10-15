import { useState, useEffect, Suspense } from 'react';
import './App.css';
import Login from './components/Login'
import Filtro from './components/Filtro';
import Formulario from './components/Formulario';
import Tarefa from './components/Tarefa';

// Resumo da lógica do frontend
// Ao renderizar, o componente App carrega as tarefas do banco e as exibe. O manejo de que tipo de tarefas - e de quais tarefas - devem ser exibidas é feito pelo array tarefas. Toda e qualquer chamada à API ocasiona uma nova consulta do banco para a atualização do array e re-renderização.

 export default function App () {
    const DOMAIN = 'http://localhost:9000';

    // Hooks ----------------------------------------------------------------------------------------------------
    const [ tarefas, setTarefas ] = useState([]);                   // Conjunto de todas as tarefas
    const [ tarefasFiltradas, setTarefasFiltradas ] = useState([]); // Tarefas a serem renderizadass
    const [ tipoAExibir, setTipoAExibir ] = useState('todas');      // Dita o filtro das tarefas
    const [ logado, setLogado ] = useState(false);                  // Define qual a interface a que o usuario tem acesso
    const [ token, setToken ] = useState('');                       // Guarda o JWT do login

    useEffect(() => { // Carrega as tarefas do banco quando logar
        if (logado) consultarTarefas();
    }, [logado]);

    useEffect(() => {
        if (logado) alterarExibicao();
    }, [ tarefas, tipoAExibir ]);

    // Markup ---------------------------------------------------------------------------------------------------
    if (!logado) return (<Login logar={logar}/>);
    else {
        return (
            <div className="card">

                {/* Titulo */}
                <h1>Bem-vindo, Vinicius</h1>

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

    // Gerencia o login
    function logar(token) {
        setToken(token);
        setLogado(true);
    }

    // Selecione o tipo de tarefa a ser exibida e renderiza a pagina novamente
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

    // Valida os campos do formulario e retorna um objeto com os dados da tarefa
    function montarTarefaParaInclusao() {
        let titulo = document.getElementById('titulo-tarefa').value;
        let data = document.getElementById('vencimento').value;
        let descricao = document.getElementById('descricao').value;

        return {
            titulo: titulo,
            vencimento: data,
            completa: false,
            descricao: descricao,
            idUsuario: 1
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

    // Limpa o formulario de adicao de tarefas
    function limparFormulario() {
        document.getElementById('titulo-tarefa').value = '';
        document.getElementById('vencimento').value = '';
        document.getElementById('descricao').value = '';
    }


    // Requisicoes a API ----------------------------------------------------------------------------------------
    
    // Adiciona uma tarefa no banco de dados
    async function adicionarTarefa() {
        let tarefa = montarTarefaParaInclusao();

        if (!tarefa) return; // Se houve erro ao montar a tarefa, ele nao prossegue para a requisicao

        // Definindo as configurações
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

    // Consulta todas as tarefas do usuario e altera o tipo de exibicao
    async function consultarTarefas() {       
        fetch(DOMAIN + '/consultar-tarefas')
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

    // Altera uma tarefa quando ela sofre alteracao
    async function alterarTarefa(id) {
        let tarefa = montarTarefaParaAlteracao(id);

        if (!tarefa) return; // Se houve erro ao montar a tarefa, ele nao prossegue para a requisicao

        // Configuracoes da requisicao
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
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
        fetch(DOMAIN + '/remover-tarefa/' + id, { method: 'DELETE' })

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