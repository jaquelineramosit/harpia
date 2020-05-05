
exports.up = function(knex) {
    return knex.schema.createTable('local', function (table) {
        table.engine('InnoDB');

        table.increments('id').primary();
        
        table.string('nome', 100).notNullable();
        table.string('logradouro', 150).notNullable();
        table.string('numero', 10).notNullable();
        table.string('complemento', 150);
        table.string('bairro', 150).notNullable();
        table.string('cep', 10).notNullable();
        table.string('cidade', 150).notNullable();
        table.string('estado', 2).notNullable();
        table.string('telefoneFixo', 15);
        table.string('whatsapp', 15);
        table.string('cnpj', 15);
        table.string('email', 250);
        table.boolean('ativo', 1).notNullable();
        table.dateTime('dataUltModif', 6).notNullable();

        table.integer('usuarioId').unsigned().notNullable().references('id').inTable('usuario');
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('local');
};
