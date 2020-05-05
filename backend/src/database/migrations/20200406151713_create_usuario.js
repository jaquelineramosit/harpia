
exports.up = function(knex) {
  return knex.schema.createTable('usuario', function (table) {
    table.engine('InnoDB');

    table.increments('id').primary();
    
    table.string('nome', 100).notNullable();
    table.string('sobrenome', 100).notNullable();
    table.dateTime('dataNasc', 6).notNullable();
    table.string('logradouro', 150).notNullable();
    table.string('numero', 10).notNullable();
    table.string('complemento', 150);
    table.string('bairro', 150).notNullable();
    table.string('cep', 10).notNullable();
    table.string('cidade', 150).notNullable();
    table.string('estado', 2).notNullable();
    table.string('telefone', 15).notNullable();
    table.string('celular', 15).notNullable();
    table.string('cpf', 15).notNullable();
    table.string('rg', 15).notNullable();
    table.string('genero', 1).notNullable();
    table.string('email', 250).notNullable();
    table.string('login', 150).notNullable();
    table.string('senha', 400).notNullable();
    table.boolean('ativo', 1).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuario');
};
