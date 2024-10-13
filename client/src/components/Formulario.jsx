import './Formulario.css';

const DOMAIN = 'http://localhost:9000';

export default function Formulario() {

    return (
      <form id="tarefa">
        <div className="dados-tarefa">
          <input type="text" id="titulo-tarefa" placeholder="Título" /> &nbsp;
          &nbsp;
          <input type="date" id="vencimento" />
        </div>
        <textarea id="descricao" placeholder="Descrição"></textarea>
        <button type="button" id="adicionar-tarefa" onClick={adicionarTarefa}>
          Adicionar
        </button>
      </form>
    );
}

// Adiciona uma tarefa no banco de dados
const adicionarTarefa = async () => {
    let tarefa = montarTarefa(); // OK
  
    if (!tarefa) return; // Se houve erro ao montar a tarefa, ele nao prossegue para a requisicao
    
    // Configuracoes para o POST - OK
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarefa)
    }

    // Requisicao para a API
    fetch(DOMAIN + '/adicionar-tarefa', options)
    .then((response) => {
      if (response.ok) {
        alert("Tarefa adicionada com sucesso!");
      }
      else {
        alert("Houve um problema na resposta à requisição.");
      }
    })
    .catch(error => {
      alert("Erro ao adicionar tarefa: " + error);
    });
  }
  
  // Valida os campos e retorna um objeto com os dados da tarefa
  const montarTarefa = () => {
    let titulo = document.getElementById('titulo-tarefa').value;
    let data = document.getElementById('vencimento').value;
    let descricao = document.getElementById('descricao').value;
  
    if ((titulo === '' || titulo === null) ||
        (data === '' || data === null)) {
          alert('Preencha todos os campos!');
          return null;
    }
  
    return {
        titulo: titulo,
        vencimento: data,
        completa: false,
        descricao: descricao,
        idUsuario: 1
    }
  }
  