const { Database } = require('../database');
require('dotenv').config({ override: true }); // Carrega as variáveis de ambiente

class UsuarioModel {
    
    // Cria um usuario
    async cadastrarUsuario(usuario) {
        console.log(usuario)
        const database = new Database();
        const client = await database.pool.connect();

        try {
            const text = 'INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3) RETURNING id, nome;';
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

    async consultarUsuario(email) {
        const database = new Database();
        const client = await database.pool.connect();

        try {
            const text = 'SELECT * FROM usuarios WHERE email = $1;';
            const value = [email];

            return await client.query(text, value);
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