const express = require('express');
const router = express.Router();
const Livros = require('../models/Livros');

// Rota para obter todos os livros
router.get('/livros', async (req, res) => {
    try {
        const livros = await Livros.findAll();
        res.json(livros);
    } catch (error) {
        console.error('Erro ao obter livros:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

// Rota para criar um novo livro
router.post('/livros', async (req, res) => {
    // Transformar título, gênero em maiúsculas
    if (req.body.titulo) {
        req.body.titulo = req.body.titulo.toUpperCase();
    }

    if (req.body.genero) {
        req.body.genero = req.body.genero.toUpperCase();
    }

    console.log(req.body);

    try {
        // Verificar se o livro já existe no banco de dados
        const existingBook = await Livros.findOne({ where: { titulo: req.body.titulo } });

        if (existingBook) {
            return res.status(400).json({
                mensagem: 'Erro: Livro já cadastrado'
            });
        }

        // Se o livro não existe, criar um novo livro
        const novoLivro = await Livros.create(req.body);
        res.status(201).json({
            mensagem: 'Livro cadastrado com sucesso!',
            livro: novoLivro
        });
    } catch (error) {
        console.error('Erro ao cadastrar livro:', error);
        res.status(400).json({ mensagem: 'Erro ao cadastrar livro' });
    }
});

// Rota para obter um livro específico por ID
router.get('/livros/:id', async (req, res) => {
    try {
        const livro = await Livros.findByPk(req.params.id);
        if (!livro) {
            return res.status(404).json({ mensagem: 'Livro não encontrado' });
        }
        res.json(livro);
    } catch (error) {
        console.error('Erro ao obter livro:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

// Rota para atualizar um livro por ID
router.put('/livros/:id', async (req, res) => {
    try {
        const livro = await Livros.findByPk(req.params.id);
        if (!livro) {
            return res.status(404).json({ mensagem: 'Livro não encontrado' });
        }
        
        // Transformar título, gênero em maiúsculas
        if (req.body.titulo) {
            req.body.titulo = req.body.titulo.toUpperCase();
        }
        
        if (req.body.genero) {
            req.body.genero = req.body.genero.toUpperCase();
        }
        

        await livro.update(req.body);
        res.json(livro);
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});


// Rota para excluir um livro por ID
router.delete('/livros/:id', async (req, res) => {
    try {
        const livro = await Livros.findByPk(req.params.id);
        if (!livro) {
            return res.status(404).json({ mensagem: 'Livro não encontrado' });
        }
        await livro.destroy();
        res.json({ mensagem: 'Livro excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir livro:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});
module.exports = router;