import './Formulario.css';

export default function Formulario() {
    return (
        <form className="formulario">
            <div className="tarefa">
                <h3>Insira aqui a sua tarefa</h3> <br />
                <div className='dados-tarefa'>
                    <input type="checkbox" id="checkbox" /> &nbsp;
                    <input type="text" id="titulo-tarefa" placeholder="Título" /> &nbsp;
                    <input type="date" id="data" /> &nbsp;
                </div>
                <textarea id="descricao" placeholder='Descrição'></textarea>
            </div>
            <button type="button">Adicionar</button>
        </form>
    );
}