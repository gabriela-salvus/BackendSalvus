const express = require('express');
const knex = require('../database/db');
const cors = require('cors');
const livrosRota = require('./routes/livros');
const outrosRota = require('./routes/outros');

port = 8080;

const router = express();

router.use(express.json());
router.use(cors());

router.use(livrosRota);
router.use(outrosRota);


router.listen(port, () => {
    console.log('Servidor está funcionando...')
});