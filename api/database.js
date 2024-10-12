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
            return await client.query("SELECT * FROM tarefas WHERE id_usuario = " + idUsuario + ";").rows;
        }
        catch (erro) {
            console.error(erro);
        }
        finally {
            client.release();
        }
    }
}

module.exports = { Database };