require('dotenv').config({ override: true }); // Carrega as variáveis de ambiente

const express = require("express");
const app = express();
const database = require('./database');
const PORT = 3000;

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE
});

(async function test() {
    const client = await pool.connect();
    
    try {
        const { rows } = await client.query('SELECT current_user');
        const currentUser = rows[0]['current_user'];
        console.log(currentUser);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        client.release();
    }
}) 

test();


// app.get('/', (request, response) => {
//     response.send('A API está funcionando');
// });

// app.get('/tarefas-usuario', (request, response) => {
//     response.send('Buscando dados no banco');
// });

// app.listen(PORT, () => {
//     console.log("Servidor rodando em http://localhost:3000");
// });