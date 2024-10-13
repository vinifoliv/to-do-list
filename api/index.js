// IMPORTS
const express = require("express");
const app = express();
const { Database } = require('./database');

// Definindo configuracoes
require('dotenv').config({ override: true }); // Carrega as variáveis de ambiente
const database = new Database();
const PORT = 9000;
app.use(express.json());

// ROTAS
app.get('/', (request, response) => { // Rota padrao para testes
    response.send('A API está funcionando');
});

app.get('/consultar-tarefas', async (request, response) => {
    let tarefas = await database.selectTarefasUsuario(1);

    response.send(JSON.stringify(tarefas));
});

app.get('/adicionar-tarefa', async (request, response) => {
    await database.adicionarTarefa(JSON.parse(request.body));
});

// SUBINDO O SERVIDOR
app.listen(PORT, () => {
    console.log("Servidor rodando em http://localhost:" + PORT);
});