const jwt = require('jsonwebtoken');
const knex = require('../../database/db');
const sha1 = require('../lib/sha1');
const Auth = require('../api/auth');

function verifyToken() {

  const User = new Auth(knex);

  return async function (req, res, next) {
    console.log('to aqui na auth',req.headers.authorization);
    const bearerToken = req.headers.authorization
      ? req.headers.authorization
      : "";

    const token = bearerToken.replace("Bearer ", "");
    console.log("Token recebido:", token);

    const auth = await User.loginWithToken(token);
    console.log("Resultado da autenticação:", auth); 
    if (auth.auth) {
      next();
    } else {
      res.status(401).json({
        statusCode: 401,
        message: {
          error: "Você não possui autorização para fazer essa requisição!",
        },
      });
    }
  };
};


module.exports = verifyToken;
