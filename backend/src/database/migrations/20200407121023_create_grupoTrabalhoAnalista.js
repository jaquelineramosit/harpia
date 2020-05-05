
exports.up = function(knex) {
    return knex.schema.createTable('grupoTrabalhoAnalista', function (table) {
        table.engine('InnoDB');

        table.increments('id').primary();
        
        table.boolean('ativo', 1).notNullable();
        table.dateTime('dataUltModif', 6).notNullable();

        table.integer('usuarioId').unsigned().notNullable().references('id').inTable('usuario');
        table.integer('analistaId').unsigned().notNullable().references('id').inTable('usuario');
        table.integer('grupoTrabalhoId').unsigned().notNullable().references('id').inTable('grupoTrabalho');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('grupoTrabalhoAnalista');
};
