// IMPORTS
const express = require("express");
const app = express();
const cors = require('cors');
const { Database } = require('./database');

// Definindo configuracoes
require('dotenv').config({ override: true }); // Carrega as variáveis de ambiente
const database = new Database();
app.use(express.json());
app.use(cors({ // Garantindo que a requisicao nao seja recusada (sim, a seguranca foi para o beleleu)
    origin: '*'
}));

// ROTAS
app.get('/', (request, response) => { // Rota padrao para testes
    response.send('A API está funcionando');
});

app.get('/consultar-tarefas', async (request, response) => {
    let tarefas = await database.selectTarefasUsuario(1);

    response.send(JSON.stringify(tarefas));
});

app.post('/adicionar-tarefa', async (request, response) => {
    console.log(request.body);
    await database.adicionarTarefa(request.body);
    response.sendStatus(200);
});

// SUBINDO O SERVIDOR
app.listen(9000, () => {
    console.log("Servidor rodando em http://localhost:9000");
});