
exports.up = function(knex) {
    return knex.schema.createTable('mensagemTicket', function (table) {
        table.engine('InnoDB');

        table.increments('id').primary();
        
        table.string('mensagem', 500).notNullable();
        table.dateTime('dataMensagem', 6).notNullable();

        table.integer('usuarioId').unsigned().notNullable().references('id').inTable('usuario');
        table.integer('remetenteId').unsigned().notNullable().references('id').inTable('usuario');
        table.integer('tipoRemetenteId').unsigned().notNullable().references('id').inTable('tipoRemetente');
        table.integer('ticketId').unsigned().notNullable().references('id').inTable('ticket');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('mensagemTicket');
};
