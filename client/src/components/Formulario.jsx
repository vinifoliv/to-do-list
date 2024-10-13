export default function Formulario() {
    return (
        <form className="tarefa">
            <div className='dados-tarefa'>
                <input type="text" id="titulo-tarefa" placeholder="Título" /> &nbsp; &nbsp;
                <input type="date" id="data" />
            </div>
            <textarea id="descricao" placeholder='Descrição'></textarea>
            <button type="button" id={'adicionar-tarefa'}>Adicionar</button>
        </form>
    );
}