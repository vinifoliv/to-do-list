const { Pool } = require('pg');

class Database {
    pool = new Pool({
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: process.env.PORT,
        database: process.env.DATABASE
    });

    // Retorna todas as tarefas para um usuário especificado
    async selectTarefasUsuario(idUsuario) {
        const client = await this.pool.connect();

        try {
            return (await client.query("SELECT * FROM tarefas WHERE id_usuario = " + idUsuario + ";")).rows;
        }
        catch (error) {
            console.error(error);
        }
        finally {
            client.release();
        }
    }

    // Adiciona uma tarefa ao banco de dados
    async adicionarTarefa(tarefa) {
        const client = await this.pool.connect();

        try {
            const text = 'INSERT INTO tarefas(titulo, vencimento, completa, descricao, id_usuario) VALUES($1, $2, $3, $4, $5);';
            const values = [tarefa['titulo'], tarefa['vencimento'], tarefa['completa'], tarefa['descricao'], tarefa['idUsuario']];

            await client.query(text, values);
        } 
        catch (error) {
            console.error(error);
        }
        finally {
            client.release();
        }
    }
}

module.exports = { Database };