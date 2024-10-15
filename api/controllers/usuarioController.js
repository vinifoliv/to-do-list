// Imports
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { UsuarioModel } = require('../models/usuarioModel');

// Configuracoes
router.use(cors( {origin: '*'} )); // Permite requisicoes de quaisquer origens (sim, a seguranca foi para o beleleu)

// Rotas --------------------------------------------------------------------------------------------------------
router.post('/cadastrar-usuario', createToken, (request, response) => {
    let usuarioModel = new UsuarioModel();

    try {

    }
    catch (error) {
        response.status(500).send('Erro ao cadastrar usuário: ' + error);
    }
});

// Helper functions ---------------------------------------------------------------------------------------------