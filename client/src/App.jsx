import './App.css';
import Formulario from './components/Formulario';
import Tarefa from './components/Tarefa';

const DOMAIN = 'http://localhost:9000';

 function App() {
  return (
    <div className="card">
      <h1 className="titulo-app">Bem-vindo</h1> <br />

      <h3>Insira aqui a sua tarefa</h3>
      <Formulario />

      <h3>Suas tarefas</h3>
      {/* { 
        tarefas !== undefined ? 
          tarefas.map((tarefa) => <Tarefa dados={ tarefa }/>) : 
            <h4>Você ainda não possui tarefas</h4> 
      } */}
    </div>
  );
}

async function consultarTarefas() {
  let tarefas = [];

  fetch(DOMAIN + '/consultar-tarefas')
  .then((response) => {
    if (!response.ok) throw new Error('Falha na requisição');

    return response.json();
  })
  .then((data) => {
    tarefas = data;
  })
  .catch((error) => {
    alert('Erro ao consultar suas tarefas: ' + error);
  });

  return tarefas;
}

export default App;