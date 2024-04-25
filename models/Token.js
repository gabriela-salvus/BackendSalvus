const knex = require('../database/db');

const Token = async () => {
  const tableExists = await knex.schema.hasTable('token');
  if (!tableExists) {
    return knex.schema.createTable('token', table => {
      table.string('token').primary();
      table.dateTime('expiresAt').notNullable();
      table.integer('accountId').unsigned().notNullable();
      table.foreign('accountId').references('id').inTable('usuarios'); 
    });
  }
};

module.exports = Token;
