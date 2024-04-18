const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'Teb@s230931',
      database: 'biblioteca'
    }
  });

knex.raw('SELECT 1+1 as result')
.then(() => console.log('Conexão com o banco de dados realizada com sucesso!'))
.catch(() => console.error('Erro: Conexão com o banco de dados não realizada com sucesso!'));

module.exports = knex;
