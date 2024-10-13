import './Tarefa.css';

export default function Tarefa(props) {
    return (
        <div className="tarefa" id={ props.dados['id'] }>
            <div className='dados-tarefa'>
                <input type="checkbox" className="checkbox" /> &nbsp;
                <input type="text" className="titulo-tarefa"value={ props.dados['titulo'] }/> &nbsp;
                <input type="date" className="data" value={ props.dados['vencimento'] }/> &nbsp;
                <span className="material-icons">delete_forever</span> <br />
            </div>
            <textarea className="descricao">{ props.dados['descricao'] }</textarea>
        </div>
    );
}