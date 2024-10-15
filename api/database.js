const { Pool } = require('pg');

class Database {
    pool = new Pool({
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: process.env.PORT,
        database: process.env.DATABASE
    });

    // // Retorna todas as tarefas para um usuário especificado
    // async consultarTarefas(idUsuario) {
    //     const client = await this.pool.connect();

    //     try {
    //         const text = 'SELECT * FROM tarefas WHERE id_usuario = $1;';
    //         const value = [ idUsuario ];

    //         return (await client.query(text, value)).rows;
    //     }
    //     catch (error) {
    //         throw error;
    //     }
    //     finally {
    //         client.release();
    //     }
    // }

    // // Adiciona uma tarefa ao banco de dados
    // async adicionarTarefa(tarefa) {
    //     const client = await this.pool.connect();

    //     try {
    //         const text = 'INSERT INTO tarefas(titulo, vencimento, completa, descricao, id_usuario) VALUES($1, $2, $3, $4, $5);';
    //         const values = [tarefa['titulo'], tarefa['vencimento'], tarefa['completa'], tarefa['descricao'], tarefa['idUsuario']];

    //         return (await client.query(text, values)).rowCount;
    //     } 
    //     catch (error) {
    //         console.error(error);
    //     }
    //     finally {
    //         client.release();
    //     }
    // }

    // // Altera uma tarefa no banco
    // async alterarTarefa(tarefa) {
    //     const client = await this.pool.connect();

    //     try {
    //         const text = 'UPDATE tarefas SET titulo = $1, vencimento = $2, completa = $3, descricao = $4 WHERE id = $5;';
    //         const values = [ 
    //             tarefa['titulo'], 
    //             tarefa['vencimento'], 
    //             tarefa['completa'], 
    //             tarefa['descricao'], 
    //             tarefa['id'] 
    //         ];
    //         console.log(tarefa)

    //         return (await client.query(text, values)).rowCount;
    //     } 
    //     catch (error) {
    //         throw error;
    //     }
    //     finally {
    //         client.release();
    //     }
    // }

    // async removerTarefa(id) {
    //     const client = await this.pool.connect();

    //     try {
    //         const text = 'DELETE FROM tarefas WHERE id = $1;';
    //         const value = [ id ];

    //         return (await client.query(text, value)).rowCount;
    //     }
    //     catch (error) {
    //         throw error;
    //     }
    //     finally {
    //         client.release();
    //     }
    // }
}

module.exports = { Database };