const express = require('express');
const knex = require ('../../database/db');
const Livros = require('../../models/Livros');


const routes = express.Router(knex);

routes.get('/ping', async (req, res) => {
    res.status(200).json({mensagem: 'pong'});
});

module.exports = routes; 