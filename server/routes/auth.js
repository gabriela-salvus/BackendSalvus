const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const knex = require('../../database/db');
const sha1 = require('../lib/sha1');
const Auth = require("../api/auth")

User = new Auth(knex);

// Rota para autenticar e gerar um token JWT
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const run = (async () => {
    const loginParams = await User.login(email, password);

    if ("error" in loginParams) {
      res.status(400).json({ statusCode: 400, message: loginParams }).end();
      return;
    }

    res.status(200).json({ statusCode: 200, message: loginParams }).end();
  })();
});

//rota para fazer logout, mas ainda nao funciona
router.post("/logout", (req, res) => {
  const { id } = req.body;
  console.log("ID do usuário para logout:", id); 

  knex("tokens")
    .where({ id: id })
    .del()
    .then(() => res.status(200).send("Token removido"))
    .catch((error) => {
      console.error("Erro ao remover o token:", error); 
      res.status(500).send("Erro ao remover o token");
    });
});


//rota para pegar informaçoes dos usuarios usando o token 
router.post("/login", (req, res) => {
  const bearerToken = req.headers.authorization
    ? req.headers.authorization
    : "";

  const token = bearerToken.replace("Bearer ", "");

  const run = (async () => {
    const loginWithParams = await User.loginWithToken(token);

    if ("error" in loginWithParams) {
      res
        .status(loginWithParams.statusCode)
        .json({
          statusCode: loginWithParams.statusCode,
          message: { error: loginWithParams.error },
        })
        .end();
      return;
    }
    res
      .status(200)
      .json({ statusCode: 200, message: loginWithParams.userParams })
      .end();
  })();
});


// rota para excluir um usuário, mas nao funciona
router.delete('/login/:id', async (req, res) => {
  const { token } = req.body;

  try {
    // olha se o token existe no banco de dados
    const existingToken = await knex('tokens').where({ token }).first();
    if (!existingToken) {
      return res.status(404).json({ error: 'Token não encontrado.' });
    }

    // deleta o token do banco de dados
    await knex('tokens').where({ token }).del();

    res.json({ message: 'Token deletado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar o token.' });
  }
});


module.exports = router;
