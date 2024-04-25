const express = require('express');
const knex = require('../database/db');
const cors = require('cors');
const livrosRota = require('./routes/livros');
//const outrosRota = require('./routes/outros');


const accountRoutes = require("./routes/usuarios");
const authRoutes = require("./routes/auth");


const router = express();

router.use(express.json());
router.use(cors());

router.use(livrosRota);
//router.use(outrosRota);
router.use(accountRoutes);
router.use(authRoutes);




router.listen(3000, () => {
    console.log('Servidor está funcionando...')
});