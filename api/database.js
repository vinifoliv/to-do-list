const { Pool } = require('pg');

class Database {
    pool = new Pool({
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: process.env.PORT,
        database: process.env.DATABASE
    });
}

module.exports = { Database };