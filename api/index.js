// Imports
const express = require("express");
const app = express();
const cors = require('cors');
const tarefasController = require('./controllers/tarefas');

const PORT = 9000;

// Configuracoes --------------------------------------------------------------------------------------
app.use(express.json());
app.use(tarefasController)
app.use(cors( {origin: '*'} )); // Permite requisicoes de quaisquer origens (sim, a seguranca foi para o beleleu)

// Rotas --------------------------------------------------------------------------------------------------------
app.get('/', (request, response) => { // Rota padrao para testes
    response.send('A API está funcionando');
});

// Rodando o servidor
app.listen(PORT, () => console.log("Servidor rodando em http://localhost:9000"));