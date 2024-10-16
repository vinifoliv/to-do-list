// Imports
require('dotenv').config({ override: true });
const express = require('express');
const router = express.Router();
const cors = require('cors');
const UsuarioModel = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Configuracoes
router.use(cors({
    origin: '*',
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rotas --------------------------------------------------------------------------------------------------------
router.post('/cadastrar-usuario', async (request, response) => {
    let usuarioModel = new UsuarioModel();
    let novoUsuario = request.body; // Objeto com nome, email e senha

    if (!novoUsuario['nome'] || !novoUsuario['email'] || !novoUsuario['senha'])
        throw new Error('Todos os campos são obrigatórios para o cadastro!');

    try {
        // Verifica se o usuario ja existe
        const usuarioJaExistente = await usuarioModel.consultarUsuario(novoUsuario['email']);
        //if (usuarioJaExistente.rowCount > 0) throw new Error('Email já cadastrado.');

        // Altera a senha para o hash gerado a partir dela
        novoUsuario['senha'] = await bcrypt.hash(novoUsuario['senha'], 10);

        // Cadastra o usuario e obtem o seu id e nome, gerando um token a partir deles
        const dadosParaToken = await usuarioModel.cadastrarUsuario(novoUsuario);
        const token = gerarToken(dadosParaToken);

        response.status(201).json({ content: token });
    }
    catch (error) {
        response.status(500).send('Erro ao cadastrar usuário: ' + error);
    }
});

router.post('/login', async (request, response) => {
    let usuarioModel = new UsuarioModel();
    let usuario = request.body; // O usuario aqui eh somente email e senha

    if (!usuario['email'] || !usuario['senha']) throw new Error('Email e senha são obrigatórios!');

    try {
        // Verifica se o usuario existe
        const usuarioExistente = await usuarioModel.consultarUsuario(usuario['email']);
        if (!usuarioExistente) throw new Error('Usuário não cadastrado.');

        // Verifica se a senha bate
        const senhaValida = await bcrypt.compare(usuario['senha'], usuarioExistente.senha);
        if (!senhaValida) throw new Error('Senha incorreta.');

        const token = gerarToken(usuarioExistente);

        response.status(200).json({ content: token });
    }
    catch(error) {
        response.status(500).send('Erro ao realizar o login: ' + error);
    }
});

// Helper functions ---------------------------------------------------------------------------------------------

// Gera um JWT
function gerarToken(usuario) {
    return jwt.sign(
        { 
            id: usuario['id'],
            nome: usuario['nome']
        },
        process.env.JWT_SECRET
    );
  }

module.exports = router;