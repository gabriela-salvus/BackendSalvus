// aqui ficarão as regras de negocio do livros
function Livros (knex) {
    this.knex = knex;

    this.list = async function () {
        const livrosList = await this.knex("livros");
    
        if (!livrosList.length) {
          return { error: "Não foi possível obter livros." };
        }
    
        return livrosList;
      };

      this.fromID = async function (id) {
        const livro = await this.knex("livros").where({ id });
    
        if (!livro.length) {
          return { error: "Livro não encontrado." };
        }
    
        return livro;
      };

      this.fromTitulo = async function (titulo) {
        const livro = await this.knex("livros").where({ titulo });
    
        if (!livro.length) {
          return { error: "Livro não encontrado." };
        }
    
        return livro;
      };
    
      this.create = async function (titulo, ano, genero) {
            const existingBook = await this.fromTitulo(titulo);

            if (!("error" in existingBook)) {
                return { error: 'Livro já cadastrado' };
            }

            const livroID = await this.knex
            .insert(
              [
                {
                  titulo,
                  ano,
                  genero,
                },
              ],
              ["id"]
            )
            .into("livros");
    
          if (!livroID) {
            return { error: "Não foi possível criar livro." };
          }
    
          return { id: livroID };
      };

      this.delete = async function (id) {
        try {
            const livro = await this.knex("livros").where({ id }).first();
            if (!livro) {
                return { error: "Livro não encontrado." };
            }
    
            await this.knex.transaction(async (trx) => {
                await this.knex("livros").where({ id }).del().transacting(trx);
            });
    
            return { message: "Livro deletado com sucesso." };
        } catch (e) {
            return { error: e };
          }
        
    };
    
    this.update = async function (id, titulo, ano, genero) {
        try {
            const validation = await this.knex("livros")
                .where({ id })
                .update({
                    titulo: titulo,
                    ano: ano,
                    genero: genero,
                });
    
            if (validation) {
                return { message: "Livro atualizado com sucesso." };
            } else {
                return { error: "Erro ao atualizar livro." };
            }
        } catch (e) {
          return { error: e };
        }
    };
      
    
    

    
    
}

module.exports = Livros;