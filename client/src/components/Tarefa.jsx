import { useState, useEffect } from 'react';
import './css/Tarefa.css';

export default function Tarefa({ dados, onRemove }) {
    
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
                <input type="checkbox" id={dados['id'] + '-checkbox'} className="checkbox" /> &nbsp;
                <input type="text" className="titulo-tarefa" id={dados['id'] + '-titulo-tarefa'}/> &nbsp;
                <input type="date" className="data" id={dados['id'] + '-data'}/> &nbsp;
                <span className="material-icons" onClick={() => onRemove(dados['id'])}>delete_forever</span> <br />
            </div>
            <textarea className="descricao" id={dados['id'] + '-descricao'}></textarea>
        </div>
    );
}