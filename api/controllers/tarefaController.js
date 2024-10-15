// Imports
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { TarefaModel } = require('../models/tarefaModel');

// Configuracoes
router.use(cors( {origin: '*'} )); // Permite requisicoes de quaisquer origens (sim, a seguranca foi para o beleleu)

// Rotas --------------------------------------------------------------------------------------------------------
// Consulta de tarefas 
router.get('/consultar-tarefas', async (request, response) => {
    let tarefaModel = new TarefaModel();

    try {
        let tarefas = await tarefaModel.consultarTarefas(1);
        response.json(tarefas);
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Erro ao consultar tarefas no banco: ' + error);
    }
});

// Adicao de tarefas 
router.post('/adicionar-tarefa', async (request, response) => {
    let tarefaModel = new TarefaModel();
    let tarefa = request.body;

    // Como as horas nao fazem sentido para a data, zero ambas para permitir ao usuario acrescentar tarefas para o dia atual
    let dataHoje = new Date().setUTCHours(0, 0, 0, 0);
    let dataTarefa = new Date(tarefa['vencimento']).setUTCHours(0, 0, 0, 0);

    try {
        // Validacao dos dados
        if (tarefa['titulo'] === '') throw new Error('O título é obrigatório!');
        if (dataTarefa < dataHoje) throw new Error('Data inválida!');

        let rowCount = await tarefaModel.adicionarTarefa(tarefa); // Objeto com a tarefa
        
        console.log(rowCount)

        if (rowCount > 0) response.sendStatus(200);
        else response.status(400).send('Tarefa inválida.');
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Erro ao adicionar tarefa no banco: ' + error);
    }
});

// Alteracao de tarefas 
router.put('/alterar-tarefa', async (request, response) => {
    let tarefaModel = new TarefaModel();
    let tarefa = request.body;

    // Como as horas nao fazem sentido para a data, zero ambas para permitir ao usuario acrescentar tarefas para o dia atual
    let dataHoje = new Date().setUTCHours(0, 0, 0, 0);
    let dataTarefa = new Date(tarefa['vencimento']).setUTCHours(0, 0, 0, 0);

    try {
        // Validacao dos dados
        if (tarefa['titulo'] === '') throw new Error('O título é obrigatório!');
        if (dataTarefa < dataHoje) throw new Error('Data inválida!');

        let rowCount = await tarefaModel.alterarTarefa(request.body); // Objeto com a tarefa
        if (rowCount > 0) response.sendStatus(200);
        else response.status(404).send('Tarefa não encontrada.');
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Erro ao alterar tarefa no banco: ' + error);
    }
});

// Remocao de tarefas 
router.delete('/remover-tarefa/:id', async (request, response) => {
    let tarefaModel = new TarefaModel();

    try {
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