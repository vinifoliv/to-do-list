import { useState, useEffect, Suspense } from 'react';
import './App.css';
import Filtro from './components/Filtro';
import Formulario from './components/Formulario';
import Tarefa from './components/Tarefa';

 export default function App () {
    const DOMAIN = 'http://localhost:9000';

    // Hooks ----------------------------------------------------------------------------------------------------
    const [ tarefas, setTarefas ] = useState([]);                   // Conjunto de todas as tarefas
    const [ tarefasFiltradas, setTarefasFiltradas ] = useState([]); // Tarefas a serem renderizadass
    const [ tipoAExibir, setTipoAExibir ] = useState('todas');      // Dita o filtro das tarefas

    useEffect(() => {
        consultarTarefas();
    }, []);             // Carrega as tarefas quando o componente renderizar
    useEffect(() => {
        alterarExibicao();
    }, [ tipoAExibir ]); // Filtra as tarefas exibidas conforme o filtro selecionado

    // Markup ---------------------------------------------------------------------------------------------------
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
                    { tarefasFiltradas.map((tarefa => <Tarefa dados={tarefa} onBlur={alterarTarefa} onRemove={removerTarefa} />)) }
                </Suspense>
            </div>

        </div>
    );

    // Helper functions -----------------------------------------------------------------------------------------

    // Selecione o tipo de tarefa a ser exibida e renderiza a pagina novamente
    function alterarExibicao() {
        let arrayAuxiliar = [];

        switch (tipoAExibir) {
            case 'todas':
                setTarefasFiltradas(tarefas);
                break;
            
            case 'pendentes':
                tarefas.forEach((tarefa) => {
                    if (tarefa['completa'] === false)
                        arrayAuxiliar.push(tarefa);
                });

                setTarefasFiltradas(arrayAuxiliar);
                break;
            
            case 'concluidas':
                tarefas.forEach((tarefa) => {
                    if (tarefa['completa'] === true)
                        arrayAuxiliar.push(tarefa);
                });

                setTarefasFiltradas(arrayAuxiliar);
                break;
            
            default:
                alert('Tipo de tarefa desconhecido');
                break;
        }
    }

    // Valida os campos do formulario e retorna um objeto com os dados da tarefa
    function montarTarefaParaInclusao() {
        let titulo = document.getElementById('titulo-tarefa').value;
        let data = document.getElementById('vencimento').value;
        let descricao = document.getElementById('descricao').value;

        if ((titulo === '' || titulo === null) ||
            (data === '' || data === null)) {
                alert('Preencha todos os campos!');
                return null;
        }

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

        if ((titulo === '' || titulo === null) ||
        (data === '' || data === null)) {
            alert('Preencha todos os campos!');
            return null;
        }

        return {
            titulo: titulo,
            vencimento: data,
            completa: completa,
            descricao: descricao,
            idUsuario: 1
        }
    }

    // Limpa o formulario de adicao de tarefas
    function limparFormulario() {
        document.getElementById('titulo-tarefa').value = '';
        document.getElementById('vencimento').value = '';
        document.getElementById('descricao').value = '';
    }

    // Involucro para melhorar legibilidade do codigo
    async function atualizarTarefas() {
        consultarTarefas();
    }

    // Acesso as APIs -------------------------------------------------------------------------------------------
    
    // Adiciona uma tarefa no banco de dados
    async function adicionarTarefa() {
        let tarefa = montarTarefaParaInclusao(); // OK

        if (!tarefa) return; // Se houve erro ao montar a tarefa, ele nao prossegue para a requisicao

        const options = { // Configuracoes para o POST - OK
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tarefa)
        }

        fetch(DOMAIN + '/adicionar-tarefa', options) // Requisicao para a API
        .then((response) => {
            if (response.ok) {
                alert("Tarefa adicionada com sucesso!");
                limparFormulario();
                atualizarTarefas();
            }
            else {
                alert("Houve um problema na resposta à requisição.");
                limparFormulario();
            }
        })
        .catch(error => {
            alert("Erro ao adicionar tarefa: " + error);
        });
    }

    // Consulta todas as tarefas do usuario e altera o tipo de exibicao para 'todas'
    async function consultarTarefas() {        
        fetch(DOMAIN + '/consultar-tarefas')
        .then((response) => {

            if (!response.ok) throw new Error('Falha na requisição');
        
            return response.json();

        })

        .then((data) => {
            setTarefas(data);
            setTipoAExibir('todas');
        })

        .catch((error) => {
            alert('Erro ao consultar suas tarefas: ' + error);
        });
    }

    // Altera uma tarefa quando ela sofre alteracao
    async function alterarTarefa(id) {
        let tarefa = montarTarefaParaAlteracao(id);

        if (!tarefa) return; // Se houve erro ao montar a tarefa, ele nao prossegue para a requisicao

        const options = { // Configuracoes para o POST - OK
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tarefa)
        }

        fetch(DOMAIN + '/alterar-tarefa', { method: 'PUT' })

        .then((response) => {
            if (response.ok) {
                alert("Tarefa alterada com sucesso!");
                atualizarTarefas();
            }
            else throw new Error('A requisição falhou.');
        })

        .catch((error) => {
            alert('Erro ao alterar a tarefa: ' + error);
        });
    }

    // Remove uma tarefa
    async function removerTarefa(id) {
        fetch(DOMAIN + '/remover-tarefa/' + id, { method: 'DELETE' })

        .then((response) => {
            if (response.ok) alert('Tarefa removida com sucesso!');
            else throw new Error('A requisição falhou.');

            atualizarTarefas();
        })

        .catch((error) => {
            alert('Não foi possível remover a tarefa: ' + error);
        });
    }
}