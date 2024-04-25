const knex = require('../database/db');

const Usuarios = async () => {
  const tableExists = await knex.schema.hasTable('usuarios');
  if (!tableExists) {
    return knex.schema.createTable('usuarios', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.integer('status').notNullable().defaultTo(1);//1=ativo
      table.timestamps(true, true);
    });
  }
};

module.exports = Usuarios;
//table.integer('status').notNullable().defaultTo(1);//1=ativo
