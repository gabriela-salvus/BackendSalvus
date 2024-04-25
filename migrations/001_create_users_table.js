exports.up = function (knex) {
    return knex.schema.createTable('usuarios', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.integer('status').notNullable().defaultTo(1);//1=ativo
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('usuarios');
  };
  