import './App.css';
import Formulario from './components/Formulario';
import Tarefa from './components/Tarefa';

function App() {
  return (
    <div className="card">
      <h1 className="titulo-app">Bem-vindo</h1> <br />

      <h3>Insira aqui a sua tarefa</h3>
      <Formulario />

      <h3>Suas tarefas</h3>
      <Tarefa />
    </div>
  );
}

export default App;