import './css/Formulario.css';

export default function Formulario({ adicionarTarefa }) {

  // Markup -----------------------------------------------------------------------------------------------------
  return (
    <form id="tarefa">

      <div className="dados-tarefa">
        <input type="text" id="titulo-tarefa" placeholder="Título" required/> &nbsp;
        <input type="date" id="vencimento" required/>
      </div>

      <textarea id="descricao" placeholder="Descrição"></textarea>

      <button type="button" id="adicionar-tarefa" onClick={adicionarTarefa}>Adicionar</button>
    </form>
  );
}