const sha1 = require("../lib/sha1");
const jwt = require("jsonwebtoken");

const jwtKey = "my_secret_key";
const jwtExpiry = "10h";

var date = new Date();

function Auth(knex) {
  this.knex = knex;

  this.login = async function (email, password) {
    const emailVerify = await this.knex("usuarios")
      .where({ email: email })
      .select("id", "name", "password")
      .first();
  
    if (emailVerify) {
      if (emailVerify.password === sha1(password)) {
        const accountId = emailVerify.id;
        const token = jwt.sign({ id: accountId }, jwtKey, {
          expiresIn: jwtExpiry,
        });
  
        var expiresAt = new Date();
        expiresAt.setHours(date.getHours() + 10); //retorna a hora atual e soma 10: ex se sao 12 ele expira 22.
  
        const userParams = await this.knex("tokens").insert({
          accountId: accountId,
          token: token,
          expiresAt: expiresAt,
        });
  
        return {
          account: {
            id: accountId,
            name: emailVerify.name,
            email: email,
          },
          token: token,
        };
      } else {
        return { error: "Senha incorreta." };
      }
    } else {
      return { error: "Email incorreto." };
    }
  };
  

  this.loginWithToken = async function (token) {
    var payload;

    try {
      payload = jwt.verify(token, jwtKey);
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return {
          auth: false,
          statusCode: 401,
          error: "Token em formato inválido.",
        };
      }
      return { auth: false, statusCode: 400, error: "Token inválido." };
    }

    const loginParams = await this.knex("usuarios")
      .where({ id: payload.id })
      .select("id", "name", "email");

    return { auth: true, userParams: loginParams[0] };
  };

  this.logout = async function (id) {
    try {
      const validation = await this.knex("tokens").where({ id }).del();

      if (validation) {
        return { message: "Logout realizado com sucesso." };
      } else {
        return { error: "Erro ao realizar logout." };
      }
    } catch (e) {
      return { error: e };
    }
  };
}

module.exports = Auth;

