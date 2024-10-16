// Imports ------------------------------------------------------------------------------------------------------
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { TarefaModel } = require('../models/tarefaModel');
const jwt = require('jsonwebtoken');

// Configurações ------------------------------------------------------------------------------------------------
router.use(cors( {origin: '*'} )); // Permite requisições de quaisquer origens (sim, a segurança foi para o beleléu)

// Rotas --------------------------------------------------------------------------------------------------------
router.get('/consultar-tarefas', async (request, response) => {
    let tarefaModel = new TarefaModel();

    // Obtendo o token
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    try {
        // Verificando
        if (!token) throw new Error('Sem token de autorização!');
        const usuario = jwt.verify(token, process.env.JWT_SECRET);

        // Consulta das tarefas
        let tarefas = await tarefaModel.consultarTarefas(usuario.id);
        response.json(tarefas);
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
});

router.post('/adicionar-tarefa', async (request, response) => {
    let tarefaModel = new TarefaModel();
    let tarefa = request.body;

    // Obtendo o token
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    try {
        // Verificando
        if (!token) throw new Error('Sem token de autorização!');
        const usuario = jwt.verify(token, process.env.JWT_SECRET);

        tarefa.idUsuario = usuario.id;

        // Como as horas não fazem sentido para a data, zerei ambas para permitir ao usuário acrescentar tarefas para o dia atual
        let dataHoje = new Date().setUTCHours(0, 0, 0, 0);
        let dataTarefa = new Date(tarefa['vencimento']).setUTCHours(0, 0, 0, 0);

        // Validação dos dados
        if (!tarefa['titulo']) throw new Error('O título é obrigatório!');
        if (dataTarefa < dataHoje) throw new Error('Data inválida!');

        let rowCount = await tarefaModel.adicionarTarefa(tarefa);
        
        if (rowCount > 0) response.sendStatus(200);
        else response.status(400).send('Tarefa inválida.');
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Erro: ' + error);
    }
});

router.put('/alterar-tarefa', async (request, response) => {
    let tarefaModel = new TarefaModel();
    let tarefa = request.body;

    // Obtendo o token
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    try {
        // Verificando
        if (!token) throw new Error('Sem token de autorização!');
        const usuario = jwt.verify(token, process.env.JWT_SECRET);

        // Como as horas não fazem sentido para a data, zerei ambas para permitir ao usuário estipular tarefas para o dia atual
        let dataHoje = new Date().setUTCHours(0, 0, 0, 0);
        let dataTarefa = new Date(tarefa['vencimento']).setUTCHours(0, 0, 0, 0);

        // Validação dos dados
        if (!tarefa['titulo']) throw new Error('O título é obrigatório!');
        if (dataTarefa < dataHoje) throw new Error('Data inválida!');

        let rowCount = await tarefaModel.alterarTarefa(request.body);

        if (rowCount > 0) response.sendStatus(200);
        else response.status(404).send('Tarefa não encontrada.');
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Erro ao alterar tarefa no banco: ' + error);
    }
});

router.delete('/remover-tarefa/:id', async (request, response) => {
    let tarefaModel = new TarefaModel();

    // Obtendo o token
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    try {
        // Verificando
        if (!token) throw new Error('Sem token de autorização!');

        const usuario = jwt.verify(token, process.env.JWT_SECRET);

        let rowCount = await tarefaModel.removerTarefa(request.params.id); // Objeto com o id da tarefa
            
        if (rowCount > 0) response.sendStatus(200);
        else response.status(404).send('Tarefa não encontrada.');
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Erro ao remover tarefa no servidor: ' + error);
    }
});

module.exports = router