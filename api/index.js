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
    try {
        let tarefas = await database.consultarTarefas(1);
        response.json(tarefas);
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Erro ao consultar tarefas no banco: ' + error);
    }
});

app.post('/adicionar-tarefa', async (request, response) => {
    try {
        let rowCount = await database.adicionarTarefa(request.body); // Objeto com a tarefa
        
        console.log(rowCount)

        if (rowCount > 0) response.sendStatus(200);
        else response.status(400).send('Tarefa inválida.');
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Erro ao adicionar tarefa no banco: ' + error);
    }
});

app.put('/alterar-tarefa', async (request, response) => {
    try {
        let rowCount = await database.alterarTarefa(request.body); // Objeto com a tarefa
        if (rowCount > 0) response.sendStatus(200);
        else response.status(404).send('Tarefa não encontrada.');
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Erro ao alterar tarefa no banco: ' + error);
    }
});

app.delete('/remover-tarefa/:id', async (request, response) => {
    try {
        let rowCount = await database.removerTarefa(request.params.id); // Objeto com o id da tarefa
        if (rowCount > 0) response.sendStatus(200);
        else response.status(404).send('Tarefa não encontrada.');
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Erro ao remover tarefa no servidor: ' + error);
    }
});

// Rodando o servidor
app.listen(9000, () => {
    console.log("Servidor rodando em http://localhost:9000");
});