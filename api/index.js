// IMPORTS
const express = require("express");
const app = express();
const cors = require('cors');
const { Database } = require('./database');

// Configuracoes --------------------------------------------------------------------------------------
require('dotenv').config({ override: true }); // Carrega as variáveis de ambiente
const database = new Database();
app.use(express.json());
app.use(cors({ // Garantindo que a requisicao nao seja recusada (sim, a seguranca foi para o beleleu)
    origin: '*'
}));

// Rotas --------------------------------------------------------------------------------------------------------
app.get('/', (request, response) => { // Rota padrao para testes
    response.send('A API está funcionando');
});

app.get('/consultar-tarefas', async (request, response) => {
    let tarefas = await database.consultarTarefas(1);
    response.json(tarefas);
});

app.post('/adicionar-tarefa', async (request, response) => {
    await database.adicionarTarefa(request.body); // Objeto com a tarefa
    response.sendStatus(200);
});

app.put('/alterar-tarefa', async (request, response) => {
    await database.alterarTarefa(request.body); // Objeto com a tarefa
    response.sendStatus(200);
});

app.delete('/remover-tarefa/:id', async (request, response) => {
    await database.removerTarefa(request.params.id); // Objeto com o id da tarefa
    response.sendStatus(200);
});

// SUBINDO O SERVIDOR
app.listen(9000, () => {
    console.log("Servidor rodando em http://localhost:9000");
});