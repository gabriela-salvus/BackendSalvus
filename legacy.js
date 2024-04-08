const express = require('express');
const server = express();
const Livros = require('./models/Livros');

server.use(express.json());

server.get('/', (req,res) => {
    return res.json({mensagem: 'A API está funcionando!!'})
});

server.listen(8080, () => {
    console.log('Servidor está funcionando...')
});

server.post('/cadastrar',async (req,res) => {
    if (req.body.titulo) {
        req.body.titulo = req.body.titulo.toUpperCase();
    }

    if (req.body.genero) {
        req.body.genero = req.body.genero.toUpperCase();
    }

    console.log(req.body);
    // Verificar se o livro já existe no banco de dados
    const existingBook = await Livros.findOne({ where: { titulo: req.body.titulo } });

    if (existingBook) {
        return res.status(400).json({
            mensagem: 'Erro: Livro já cadastrado'
        });
    }
    // Se o livro não existe, criar um novo livro
    await Livros.create(req.body)
    .then(() => {
        return res.json({
            mensagem: 'Livro cadastrado com sucesso!'
        });
    }).catch(() => {
        return res.status(400).json({
            mensagem: 'Erro: Livro não cadastrado com sucesso'
        });
    });

    //res.send('Página de cadastro');
});