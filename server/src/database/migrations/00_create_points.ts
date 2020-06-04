// O Knex, iniciando com letra maiuscula, serve para indicar que estamos importando o tipo
import Knex from 'knex';

//Usada para realizar alterações no banco de dados
export async function up(knex: Knex) {
    
    //Definindo os campos da tabela 'points'
    return knex.schema.createTable('points',table => {
        table.increments('id').primary;
        table.string('image').notNullable;
        table.string('name').notNullable;
        table.string('email').notNullable;
        table.string('whatshapp').notNullable;
        table.decimal('latitude').notNullable;
        table.decimal('longitude').notNullable;
        table.string('city').notNullable;
        table.string('uf',2).notNullable;
    });

}

//usada para voltar atrás em uma alteração feita no banco de dados
export async function down(knex: Knex) {
    
    //Deleta a tabela points
    return knex.schema.dropTable('points');
}