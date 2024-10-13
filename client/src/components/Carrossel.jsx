import './Carrossel.css';
import { Suspense, useEffect, useState } from 'react';
import Tarefa from './Tarefa';
import Filtro from './Filtro';

export default function Carrossel() {

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
                { tarefasFiltradas.map((tarefa => <Tarefa dados={tarefa}/>)) }
            </Suspense>
        </div>
    );

    // Helper functions -----------------------------------------------------------------------------------------

    async function consultarTarefas() {        
        fetch('http://localhost:9000/consultar-tarefas')
        .then((response) => {
            if (!response.ok) throw new Error('Falha na requisição');
        
            return response.json();
        })
        .then((data) => {
            setTarefas(data);
            if (tarefasFiltradas.length === 0)
                setTarefasFiltradas(data);
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
}