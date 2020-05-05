
exports.up = function(knex) {
    return knex.schema.createTable('ticket', function (table) {
        table.engine('InnoDB');

        table.increments('id').primary();
        
        table.string('assunto', 45).notNullable();
        table.string('descricao', 150).notNullable();
        table.string('tags', 150).notNullable();
        table.dateTime('dataTicket', 6).notNullable();
        table.dateTime('dataValidade', 6).notNullable();
        table.dateTime('dataUltModif', 6).notNullable();

        table.integer('usuarioId').unsigned().notNullable().references('id').inTable('usuario');
        table.integer('clienteId').unsigned().notNullable().references('id').inTable('usuario');
        table.integer('analistaId').unsigned().notNullable().references('id').inTable('usuario');
        table.integer('localId').unsigned().notNullable().references('id').inTable('local');
        table.integer('statusTicketId').unsigned().notNullable().references('id').inTable('statusTicket');
        table.integer('tipoTicketId').unsigned().notNullable().references('id').inTable('tipoTicket');
        table.integer('prioridadeId').unsigned().notNullable().references('id').inTable('prioridade');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('ticket');
};
