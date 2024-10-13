import './Tarefa.css';

export default function Tarefa() {
    return (
        <div className="tarefa">
            <div className='dados-tarefa'>
                <input type="checkbox" className="checkbox" /> &nbsp;
                <input type="text" className="titulo-tarefa" placeholder="Título" /> &nbsp;
                <input type="date" className="data" /> &nbsp;
                <span className="material-icons">delete_forever</span> <br />
            </div>
            <textarea className="descricao" placeholder='Descrição'></textarea>
        </div>
    );
}