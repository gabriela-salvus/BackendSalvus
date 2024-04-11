const express = require('express');
const server = express();
const Livros = require('./models/Livros');
const outrosRota = require('./routes/outros.js');

const cors = require('cors');

server.use(express.json());
server.use(cors());
server.use(outrosRota);


// Rota para obter todos os livros
server.get('/livros', async (req, res) => {
    try {
        const livros = await Livros.findAll();
        res.json(livros);
    } catch (error) {
        console.error('Erro ao obter livros:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

server.get('/ping', async (req, res) => {
        res.status(200).json({mensagem: 'pong'});
});


// Rota para criar um novo livro
server.post('/livros', async (req, res) => {
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
server.get('/livros/:id', async (req, res) => {
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

// Rota para editar, alugar ou devolver um livro por ID
server.put('/livros/:id', async (req, res) => {
    try {
        const livro = await Livros.findByPk(req.params.id);
        if (!livro) {
            return res.status(404).json({ mensagem: 'Livro não encontrado' });
        }

        // Verificar se o cliente enviou o status no corpo da solicitação
        if ('status' in req.body) {
            const novoStatus = req.body.status;

            // Verificar se o novo status é válido (0 para alugado, 1 para em estoque)
            if (novoStatus !== 0 && novoStatus !== 1) {
                return res.status(400).json({ mensagem: 'Status inválido. Use 0 para alugado ou 1 para em estoque' });
            }

            // Se o livro estiver sendo alugado, alterar para "alugado" (0), caso contrário, alterar para "em estoque" (1)
            if (novoStatus === 0 && livro.status === 1) {
                livro.status = 0;
                res.json({ mensagem: 'Livro alugado com sucesso' });
            } else if (novoStatus === 1 && livro.status === 0) {
                livro.status = 1;
                res.json({ mensagem: 'Livro devolvido com sucesso' });
            } else {
                res.status(400).json({ mensagem: 'Operação inválida. Verifique o status atual do livro' });
            }
        } else {
            // Atualizar outros campos do livro, se fornecidos no corpo da solicitação
            if ('titulo' in req.body) {
                livro.titulo = req.body.titulo;
            }
            if ('ano' in req.body) {
                livro.ano = req.body.ano;
            }
            if ('genero' in req.body) {
                livro.genero = req.body.genero;
            }

            await livro.save();
            res.json({ mensagem: 'Livro atualizado com sucesso' });
        }
    } catch (error) {
        console.error('Erro ao editar/alugar/devolver livro:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});



// Rota para excluir um livro por ID
server.delete('/livros/:id', async (req, res) => {
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

server.listen(8080, () => {
    console.log('Servidor está funcionando...')
});
