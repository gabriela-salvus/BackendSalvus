module.exports = {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'Teb@s230931',
      database: 'biblioteca'
    },
    migrations: {
      directory: __dirname + '/migrations'
    }
};
