const express = require('express');
const router = express.Router();
const Livros = require('../models/Livros');

router.get('/ping', async (req, res) => {
    res.status(200).json({mensagem: 'pong'});
});

module.exports = router;