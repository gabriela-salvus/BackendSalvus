exports.up = function (knex) {
    return knex.schema.createTable('tokens', function (table) {
      table.string('token').primary();
      table.dateTime('expiresAt').notNullable();
      table.integer('accountId').unsigned().notNullable();
      table.foreign('accountId').references('id').inTable('usuarios');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('tokens');
  };