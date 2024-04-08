const express = require('express');
const routes = express.Router();


routes.get('/ping', async (req, res) => {
    res.status(200).json({mensagem: 'pong'});
});

module.exports = routes;