import './Carrossel.css';
import { Suspense, useEffect, useState } from 'react';
import Tarefa from './Tarefa';

export default function Carrossel() {
    const [ tarefas, setTarefas ] = useState([]);

    useEffect(() => {
        consultarTarefas();
    }, []);

    return (
        <div className="carrosel" id="carrossel">
            <Suspense fallback={ <h4>Carregando as suas tarefas...</h4>} >
                { tarefas.map((tarefa => <Tarefa dados={tarefa}/>)) }
            </Suspense>
        </div>
    );

    // Helper functions
    async function consultarTarefas() {        
        fetch('http://localhost:9000/consultar-tarefas')
        .then((response) => {
            if (!response.ok) throw new Error('Falha na requisição');
        
            return response.json();
        })
        .then((data) => {
            setTarefas(data);
        })
        .catch((error) => {
            alert('Erro ao consultar suas tarefas: ' + error);
        });
    }
}