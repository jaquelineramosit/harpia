
exports.up = function(knex) {
    return knex.schema.createTable('clienteLocal', function (table) {
        table.engine('InnoDB');

        table.increments('id').primary();
        
        table.boolean('ativo', 1).notNullable();
        table.dateTime('dataUltModif', 6).notNullable();

        table.integer('usuarioId').unsigned().notNullable().references('id').inTable('usuario');
        table.integer('clienteId').unsigned().notNullable().references('id').inTable('usuario');
        table.integer('localId').unsigned().notNullable().references('id').inTable('local');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('clienteLocal');
};
