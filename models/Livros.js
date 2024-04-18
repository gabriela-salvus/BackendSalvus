const knex = require('../database/db');

const Livros = async () => {
  const tableExists = await knex.schema.hasTable('livros');
  if (!tableExists) {
    return knex.schema.createTable('livros', table => {
      table.increments('id').primary();
      table.string('titulo').notNullable();
      table.integer('ano').notNullable();
      table.string('genero').notNullable();
      table.integer('status').notNullable().defaultTo(1);
      table.timestamps(true, true); 
    });
  }
};

module.exports = Livros;



//Livros.sync; 
