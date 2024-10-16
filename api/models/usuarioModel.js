const { Database } = require('../database');
require('dotenv').config({ override: true }); // Carrega as variáveis de ambiente

class UsuarioModel {
    
    // Cria um usuario
    async cadastrarUsuario(usuario) { // recebe o objeto com nome, email e senha
        const database = new Database();
        const client = await database.pool.connect();

        try {
            // Montando a consulta
            const text = 'INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3) RETURNING id, nome;';
            const values = [usuario['nome'], usuario['email'], usuario['senha']];

            // Query
            const result = await client.query(text, values);

            return result.rows[0];
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            client.release();
        }
    }

    async consultarUsuario(email) {
        const database = new Database();
        const client = await database.pool.connect();

        try {
            const text = 'SELECT * FROM usuarios WHERE email = $1;';
            const value = [email];

            const result = await client.query(text, value);
            return result.rows[0];
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