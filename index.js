const express = require('express');
const server = express();
const outrosRota = require('./routes/outros');
const livrosRoutes = require('./routes/livros');

const cors = require('cors');

server.use(express.json());
server.use(cors());
server.use('/ping',outrosRota);
server.use('/livros', livrosRoutes);



server.listen(8080, () => {
    console.log('Servidor está funcionando...')
});
