const express = require('express');
const knex = require ('../../database/db');
const Livros = require('../api/livros');

const Book = new Livros(knex);
const routes = express.Router(knex);

// Rota para obter todos os livros
routes.get('/livros', async (req, res) => {
    const run = (async () => {
        const livros = await Book.list();
            console.log(livros);
        if ("error" in livros) {
          res.status(400).json({ statusCode: 400, message: livros }).end();
          return;
        }
    
        res.status(200).json({ statusCode: 200, message: livros }).end();
    })();
});

// Rota para criar um novo livro
routes.post('/livros', async (req, res) => {
    // Transformar título, gênero em maiúsculas
    let titulo, ano, genero; 
    
    if (req.body.titulo) {
        titulo = req.body.titulo.toUpperCase();
    }

    if (req.body.genero) {
        genero = req.body.genero.toUpperCase();
    }
    ano = req.body.ano;

    const run = (async () => {
    const livroID = await Book.create(titulo, ano, genero);

    if ("error" in livroID) {
      res.status(400).json({ statusCode: 400, message: livroID }).end();
      return;
    }

    res.status(200).json({ statusCode: 200, message: livroID }).end();
  })();
});

// Rota para obter um livro específico por ID
routes.get('/livros/:id', async (req, res) => {
    const { id } = req.params;

  const run = (async () => {
    const livro = await Book.fromID(id);

    if ("error" in livro) {
      res.status(400).json({ statusCode: 400, message: livro }).end();
      return;
    }

    res.status(200).json({ statusCode: 200, message: livro }).end();
  })();
});

// Rota para atualizar um livro por ID
routes.put("/livros/:id", (req, res, next) => {
    let titulo, ano, genero; 
    
    if (req.body.titulo) {
        titulo = req.body.titulo.toUpperCase();
    }

    if (req.body.genero) {
        genero = req.body.genero.toUpperCase();
    }
    ano = req.body.ano;   
    
    const { id } = req.params;
    const run = (async () => {
        const message = await Book.update(id, titulo, ano, genero);
    
        if ("error" in message) {
        res.status(400).json({ statusCode: 400, message: message }).end();
        return;
        }
    
        res.status(200).json({ statusCode: 200, message: message.message }).end();
    })();
    });
      


// Rota para excluir um livro por ID
routes.delete("/livros/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const message = await Book.delete(id);

        if ("error" in message) {
            res.status(400).json({ statusCode: 400, message: message.error }).end();
        } else {
            res.status(200).json({ statusCode: 200, message: message.message }).end();
        }
    } catch (error) {
        console.error("Erro ao deletar livro:", error);
        res.status(500).json({ statusCode: 500, message: "Erro ao deletar livro." }).end();
    }
});


module.exports = routes;