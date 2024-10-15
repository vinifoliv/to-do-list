const { Database } = require('../database');
require('dotenv').config({ override: true }); // Carrega as variáveis de ambiente

class UsuarioModel {
    // Cria um usuario
    async cadastrarUsuario(usuario) {
        const database = new Database();
        const client = await database.pool.connect();

        try {
            const text = 'INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3);';
            const values = [usuario['nome'], usuario['email'], usuario['senha']];

            return (await client.query(text, values)).rowCount;
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            client.release();
        }
    }
}

module.exports = UsuarioModel;