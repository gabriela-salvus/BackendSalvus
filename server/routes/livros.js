const express = require('express');
const knex = require ('../../database/db');
const Livros = require('../api/livros');
const verifyToken = require('../middleware/authMiddleware');


const Book = new Livros(knex);
const routes = express.Router(knex);

// Rota para obter todos os livros
routes.get('/livros', verifyToken(), async (req, res, next) => {
    try {
        const livros = await Book.list();
        console.log(livros);
        if ("error" in livros) {
          res.status(400).json({ statusCode: 400, message: livros }).end();
          return;
        }
    
        res.status(200).json({ statusCode: 200, message: livros }).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: 'Erro ao obter a lista de livros.' }).end();
    }
});

// Rota para criar um novo livro
routes.post('/livros', verifyToken(), async (req, res, next) => {
    try {
        // Transformar título, gênero em maiúsculas
        let titulo, ano, genero; 
    
        if (req.body.titulo) {
            titulo = req.body.titulo.toUpperCase();
        }

        if (req.body.genero) {
            genero = req.body.genero.toUpperCase();
        }
        ano = req.body.ano;

        const livroID = await Book.create(titulo, ano, genero);

        if ("error" in livroID) {
          res.status(400).json({ statusCode: 400, message: livroID }).end();
          return;
        }

        res.status(200).json({ statusCode: 200, message: livroID }).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: 'Erro ao criar um novo livro.' }).end();
    }
});

// Rota para obter um livro específico por ID
routes.get('/livros/:id', verifyToken(), async (req, res, next) => {
    try {
        const { id } = req.params;
        const livro = await Book.fromID(id);

        if ("error" in livro) {
          res.status(400).json({ statusCode: 400, message: livro }).end();
          return;
        }

        res.status(200).json({ statusCode: 200, message: livro }).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: 'Erro ao obter o livro.' }).end();
    }
});

// Rota para atualizar um livro por ID
routes.put("/livros/:id", verifyToken(), async (req, res, next) => {
    try {
        let titulo, ano, genero, status; 
    
        if (req.body.titulo) {
            titulo = req.body.titulo.toUpperCase();
        }

        if (req.body.genero) {
            genero = req.body.genero.toUpperCase();
        }
        ano = req.body.ano; 
        status = req.body.status;  
    
        const { id } = req.params;
        const message = await Book.update(id, titulo, ano, genero, status);
    
        if ("error" in message) {
          res.status(400).json({ statusCode: 400, message: message }).end();
          return;
        }
    
        res.status(200).json({ statusCode: 200, message: message.message }).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: 'Erro ao atualizar o livro.' }).end();
    }
});
      


// Rota para excluir um livro por ID
routes.delete("/livros/:id", verifyToken(), async (req, res, next) => {
    try {
        const { id } = req.params;
        const message = await Book.delete(id);

        if ("error" in message) {
            res.status(400).json({ statusCode: 400, message: message.error }).end();
        } else {
            res.status(200).json({ statusCode: 200, message:message.message }).end();
        }
        } catch (error) {
        console.error("Erro ao deletar livro:", error);
        res.status(500).json({ statusCode: 500, message: "Erro ao deletar livro." }).end();
        }
        });
        
module.exports = routes;
              