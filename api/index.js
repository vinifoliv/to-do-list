const express = require("express");
const app = express();

const PORT = 3000;

app.get('/', (request, response) => {
    response.send('A API está funcionando');
});

app.listen(PORT, () => {
    console.log("Servidor rodando em http://localhost:3000");
});