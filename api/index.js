// Imports ------------------------------------------------------------------------------------------------------
const express = require("express");
const app = express();
const cors = require('cors');
const tarefaController = require('./controllers/tarefaController');
const usuarioController = require('./controllers/usuarioController');

// Configurações ------------------------------------------------------------------------------------------------
app.use(express.json());
app.use(tarefaController);
app.use(usuarioController);
app.use(cors( {origin: '*'} )); // Permite requisicoes de quaisquer origens (sim, a seguranca foi para o beleleu)
const PORT = 9000;

// Rotas --------------------------------------------------------------------------------------------------------
app.get('/', (request, response) => { // Rota para testes
    response.send('A API está funcionando');
});

// Rodando o servidor
app.listen(PORT, () => console.log("Servidor rodando em http://localhost:" + PORT));