import { useEffect } from 'react';
import './css/Tarefa.css';

export default function Tarefa({ dados, alterarTarefa, removerTarefa }) {
    
    // Hooks ----------------------------------------------------------------------------------------------------
    useEffect(() => {
        let id = dados['id'];
        // Checkbox
        if (dados['completa'] === true) document.getElementById(id + '-checkbox').checked = true;
        else document.getElementById(id + '-checkbox').checked = false;

        // Titulo da tarefa
        document.getElementById(id + '-titulo-tarefa').value = dados['titulo'];

        // Data
        document.getElementById(id + '-data').value = dados['vencimento'].split('T')[0];

        // Descricao
        document.getElementById(id + '-descricao').value = dados['descricao'];
    }, [ dados ]);

    // Markup ---------------------------------------------------------------------------------------------------
    
    return (
        <div className="tarefa" id={ dados['id'] }>
            <div className='dados-tarefa'>

                {/* Checkbox */}
                <input type="checkbox" 
                    id={dados['id'] + '-checkbox'} 
                    className="checkbox"
                /> &nbsp;

                {/* Titulo da tarefa */}
                <input type="text" 
                    className="titulo-tarefa" 
                    id={dados['id'] + '-titulo-tarefa'}
                /> &nbsp;

                {/* Data de vencimento */}
                <input type="date" 
                    className="data" 
                    id={dados['id'] + '-data'}
                /> &nbsp;

                {/* Botao de remocao */}
                <span className="material-icons" onClick={() => removerTarefa(dados['id'])}>delete_forever</span> <br />

            </div>

            {/* Descricao */}
            <textarea 
                className="descricao" 
                id={dados['id'] + '-descricao'} 
            ></textarea>

            {/* Botao de alterar */}
            <button 
                className="alterar"
                id={dados['id'] + 'botao'}
                onClick={() => alterarTarefa(dados['id'])}
            >Alterar</button>
        </div>
    );

    // Helper functions

}