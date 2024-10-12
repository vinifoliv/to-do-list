import { useState } from 'react';
import './App.css';
import Tarefa from './components/Tarefa';

const DOMAIN = 'localhost:9000';

function App() {
  const [ tarefas, setTarefas ] = useState(null);
  setTarefas(getTarefas());

  return (
    <div className="card">
      <h1 className="titulo-app">Welcome, Vinícius</h1> <br />
      
        <Tarefa />
    </div>
  );
}

async function getTarefas() {
  fetch(DOMAIN + '/tarefas-usuario').then((response) => {
    response.text().then((tarefas) => {
      return tarefas;
    });
  });
}

export default App;