const { Database } = require('../database');
require('dotenv').config({ override: true }); // Carrega as variáveis de ambiente

class TarefaModel {
    // Retorna todas as tarefas para um usuário especificado
    async consultarTarefas(idUsuario) {
        const database = new Database();
        const client = await database.pool.connect();

        try {
            // Montando a consulta
            const text = 'SELECT * FROM tarefas WHERE id_usuario = $1;';
            const value = [ idUsuario ];

            // Query
            return (await client.query(text, value)).rows;
        }
        catch (error) {
            throw error;
        }
        finally {
            client.release();
        }
    }

    // Adiciona uma tarefa ao banco de dados
    async adicionarTarefa(tarefa) { // Argumento é um objeto com TÍTULO, VENCIMENTO, COMPLETA, DESCRIÇÃO e ID USUÁRIO
        const database = new Database();
        const client = await database.pool.connect();

        try {
            // Montando a consulta
            const text = 'INSERT INTO tarefas(titulo, vencimento, completa, descricao, id_usuario) VALUES($1, $2, $3, $4, $5);';
            const values = [tarefa['titulo'], tarefa['vencimento'], tarefa['completa'], tarefa['descricao'], tarefa['idUsuario']];

            // Query
            return (await client.query(text, values)).rowCount;
        } 
        catch (error) {
            console.error(error);
        }
        finally {
            client.release();
        }
    }

    // Altera uma tarefa no banco
    async alterarTarefa(tarefa) { // Argumento é um objeto com TÍTULO, VENCIMENTO, COMPLETA, DESCRIÇÃO e ID TAREFA
        const database = new Database();
        const client = await database.pool.connect();

        try {
            // Montando a consulta
            const text = 'UPDATE tarefas SET titulo = $1, vencimento = $2, completa = $3, descricao = $4 WHERE id = $5;';
            const values = [ 
                tarefa['titulo'], 
                tarefa['vencimento'], 
                tarefa['completa'], 
                tarefa['descricao'], 
                tarefa['id'] 
            ];
            
            // Query
            return (await client.query(text, values)).rowCount;
        } 
        catch (error) {
            throw error;
        }
        finally {
            client.release();
        }
    }

    // Remove uma tarefa no banco a partir do seu ID
    async removerTarefa(id) {
        const database = new Database();
        const client = await database.pool.connect();

        try {
            // Montando a consulta
            const text = 'DELETE FROM tarefas WHERE id = $1;';
            const value = [ id ];

            // Query
            return (await client.query(text, value)).rowCount;
        }
        catch (error) {
            throw error;
        }
        finally {
            client.release();
        }
    }
}

module.exports = { TarefaModel };