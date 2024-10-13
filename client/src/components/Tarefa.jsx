import './Tarefa.css';

export default function Tarefa(props) {
    console.log(props.dados);

    return (
        <div className="tarefa" id={ props.dados['id'] }>
            <div className='dados-tarefa'>
                {
                    /* Renderizacao do checkbox checked ou nao */
                    props.dados['completa'] === true ? <input type="checkbox" className="checkbox" checked/> :
                    <input type="checkbox" className="checkbox" checked/>
                } &nbsp;
                <input type="text" className="titulo-tarefa"value={ props.dados['titulo'] }/> &nbsp;
                <input type="date" className="data" value={ props.dados['vencimento'].split('T')[0] }/> &nbsp;
                <span className="material-icons">delete_forever</span> <br />
            </div>
            <textarea className="descricao">{ props.dados['descricao'] }</textarea>
        </div>
    );
}