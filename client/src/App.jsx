// import { useState } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import Tarefa from './components/Tarefa';

// const DOMAIN = 'localhost:9000';

function App() {
  // const [ tarefas, setTarefas ] = useState(null);

  return (
    <div className="card">
      <h1 className="titulo-app">Welcome, Vinícius</h1> <br />
      <Formulario />
      <Tarefa />
    </div>
  );
}

export default App;