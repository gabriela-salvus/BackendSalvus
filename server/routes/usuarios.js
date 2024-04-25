const express = require('express');
const router = express.Router();
const knex = require('../../database/db');
const sha1 = require('../lib/sha1');
const verifyToken = require('../middleware/authMiddleware');

// Rota para criar um novo usuário
router.post('/usuarios', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = sha1(password); // Hashing the password
    const userId = await knex('usuarios').insert({ name, email, password: hashedPassword });
    res.json({ userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});

// rota para buscar todos os usuários
router.get('/usuarios',  verifyToken(), async (req, res) => {
  try {
    const users = await knex('usuarios').select('id', 'name', 'email');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

// Rota para atualizar informações de um usuário
router.put('/usuarios/:id',  verifyToken(), async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  try {
    const hashedPassword = sha1(password); // Hashing the new password
    await knex('usuarios').where({ id: userId }).update({ name, email, password: hashedPassword });
    res.json({ message: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
});


module.exports = router;
