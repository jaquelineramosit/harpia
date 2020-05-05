
exports.up = function(knex) {
    return knex.schema.createTable('perfilAcessoUsuario', function (table) {
        table.engine('InnoDB');

        table.increments('id').primary();

        table.dateTime('dataUltModif', 6).notNullable();

        table.integer('perfilAcessoId').unsigned().notNullable().references('id').inTable('perfilAcesso');
        table.integer('usuarioId').unsigned().notNullable().references('id').inTable('usuario');
      });  
};

exports.down = function(knex) {
    return knex.schema.dropTable('perfilAcessoUsuario');
};
