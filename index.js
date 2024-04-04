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
    console.log(req.body);

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