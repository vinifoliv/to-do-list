import { useState, useEffect } from 'react';
import './Tarefa.css';

export default function Tarefa(props) {
    
    // Hooks ----------------------------------------------------------------------------------------------------
    const [ id, setId ] = useState(props.dados['id']);

    useEffect(() => {
        // Checkbox
        if (props.dados['completa'] === true) document.getElementById(id + '-checkbox').checked = true;
        else document.getElementById(id + '-checkbox').checked = false;

        // Titulo da tarefa
        document.getElementById(id + '-titulo-tarefa').value = props.dados['titulo'];

        // Data
        document.getElementById(id + '-data').value = props.dados['vencimento'].split('T')[0];

        // Descricao
        document.getElementById(id + '-descricao').value = props.dados['descricao'];
    }, [ id, props ]);

    // Markup ---------------------------------------------------------------------------------------------------

    return (
        <div className="tarefa" id={ id }>
            <div className='dados-tarefa'>
                <input type="checkbox" id={id + '-checkbox'} className="checkbox" /> &nbsp;
                <input type="text" className="titulo-tarefa" id={id + '-titulo-tarefa'}/> &nbsp;
                <input type="date" className="data" id={id + '-data'}/> &nbsp;
                <span className="material-icons">delete_forever</span> <br />
            </div>
            <textarea className="descricao" id={id + '-descricao'}></textarea>
        </div>
    );
}