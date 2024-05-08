exports.up = function(knex) {
    return knex.schema.createTable('livros', function(table) {
      table.increments('id').primary();
      table.string('titulo').notNullable();
      table.integer('ano').notNullable();
      table.string('genero').notNullable();
      table.integer('status').notNullable().defaultTo(1);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('livros');
  };
  