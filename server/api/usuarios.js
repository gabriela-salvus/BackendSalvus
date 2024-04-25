const SHA1 = require("../lib/sha1");

function Usuarios(knex, currentUser) {
  this.knex = knex;
  this.currentUser = currentUser;

  this.list = async function () {
    const usuarios = await this.knex
      .select("id", "name", "email")
      .from("usuarios");

    if (!usuarios.length) {
      return { error: "Nâo foi possível listar usuarios." };
    }

    return account;
  };

  this.create = async function (name, email, password, status) {
    const sha1Pass = SHA1(password);

    try {
      const userID = await this.knex
        .insert(
          [
            {
              name: name,
              email: email,
              password: sha1Pass,
              status:status,
            },
          ],
          ["id"]
        )
        .into("usuarios");

      if (!userID) {
        return { error: "Nâo foi possível criar usuário." };
      }

      return { id: userID };
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        return { error: "Esse email já está cadastrado." };
      }

      return e;
    }
  };

  this.update = async function (id, name, email, password, status) {
    const sha1Pass = SHA1(password);

    try {
      const validation = await this.knex("usuarios").where({ id }).update({
        name: name,
        email: email,
        password: sha1Pass,
        status: status,
      });

      if (validation) {
        return { message: "Usuário atualizado com sucesso." };
      } else {
        return { error: "Erro ao atualizar usuário." };
      }
    } catch (e) {
      return { error: e };
    }
  };

  this.delete = async function (id) {
    try {
      const validation = await this.knex("usuarios").where({ id }).del();

      if (validation) {
        return { message: "Usuário deletado com sucesso." };
      } else {
        return { error: "Erro ao deletar usuário." };
      }
    } catch (e) {
      return { error: e };
    }
  };
}

module.exports = Usuarios;

