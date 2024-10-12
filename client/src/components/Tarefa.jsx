import './Tarefa.css';

export default function Tarefa() {
    return (
        <div className="tarefa">
            <div className='dados-tarefa'>
                <input type="checkbox" id="checkbox" /> &nbsp;
                <input type="text" id="titulo-tarefa" placeholder="Título" /> &nbsp;
                <input type="date" id="data" /> &nbsp;
                <span className="material-icons">delete_forever</span> <br />
            </div>
            <textarea id="descricao" placeholder='Descrição'></textarea>
        </div>
    );
}