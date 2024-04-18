const express = require('express');
const router = express();
const knex = require('./database/db');
const cors = require('cors');
const livros = require('./models/Livros');

router.use(express.json());
router.use(cors());


router.listen(8080, () => {
    console.log('Servidor está funcionando...')
});

module.exports = router;
