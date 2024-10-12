// IMPORTS
const express = require("express");
const app = express();
const { Database } = require('./database');

require('dotenv').config({ override: true }); // Carrega as variáveis de ambiente
const database = new Database();
const PORT = 3000;

// ROTAS
app.get('/', (request, response) => {
    response.send('A API está funcionando');
});

app.get('/tarefas-usuario', async (request, response) => {
    console.log('Buscando dados no banco...');
    let tarefas = await database.selectTarefasUsuario(1);
});

// SUBINDO O SERVIDOR
app.listen(PORT, () => {
    console.log("Servidor rodando em http://localhost:3000");
});