import './App.css';
import Carrossel from './components/Carrossel';
import Formulario from './components/Formulario';

 function App() {
  return (
    <div className="card">
      <h1 className="titulo-app">Bem-vindo</h1> <br />

      <h3>Insira aqui a sua tarefa</h3>
      <Formulario />

      <h3>Suas tarefas</h3> <br />
      <Carrossel />
    </div>
  );
}

export default App;