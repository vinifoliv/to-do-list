import './Carrossel.css';
import { Suspense, useEffect, useState } from 'react';
import Tarefa from './Tarefa';
import Filtro from './Filtro';

export default function Carrossel() {
    const DOMAIN = 'http://localhost:9000';

    // Hooks ----------------------------------------------------------------------------------------------------

    const [ tarefas, setTarefas ] = useState([]);
    const [ tarefasFiltradas, setTarefasFiltradas ] = useState([]);
    const [ tipoAExibir, setTipoAExibir ] = useState('todas');

    useEffect(() => {
        consultarTarefas();
    }, []);

    useEffect(alterarExibicao, [ tipoAExibir ]);

    // Markup ---------------------------------------------------------------------------------------------------

    return (
        <div className="carrosel" id="carrossel">
            <Filtro onClick={ handleClick }/>
            <Suspense fallback={ <h4>Carregando as suas tarefas...</h4>} >
                { tarefasFiltradas.map((tarefa => <Tarefa dados={tarefa} onRemove={removerTarefa} />)) }
            </Suspense>
        </div>
    );

    // Helper functions -----------------------------------------------------------------------------------------

    async function consultarTarefas() {        
        fetch(DOMAIN + '/consultar-tarefas')
        .then((response) => {
            if (!response.ok) throw new Error('Falha na requisição');
        
            return response.json();
        })
        .then((data) => {
            setTarefas(data);
            if (tarefasFiltradas.length === 0)
                setTarefasFiltradas(data);
            setTipoAExibir('todas');
        })
        .catch((error) => {
            alert('Erro ao consultar suas tarefas: ' + error);
        });
    }

    function handleClick(tipo) {
        setTipoAExibir(tipo);
    }

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
        }
    }

    async function removerTarefa(id) {
        fetch(DOMAIN + '/remover-tarefa/' + id, { method: 'DELETE' })
        .then((response) => {
            if (response.ok) alert('Tarefa removida com sucesso!');
            else throw new Error('A requisição falhou.');

            consultarTarefas();
        })
        .catch((error) => {
            alert('Não foi possível remover a tarefa: ' + error);
        });
    }
}