
exports.up = function(knex) {
    return knex.schema.createTable('tipoRemetente', function (table) {
        table.engine('InnoDB');

        table.increments('id').primary();
        
        table.string('nometipoRemetente', 50).notNullable();
        table.boolean('ativo', 1).notNullable();
        table.dateTime('dataUltModif', 6).notNullable();

        table.integer('usuarioId').unsigned().notNullable().references('id').inTable('usuario');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tipoRemetente');
};
