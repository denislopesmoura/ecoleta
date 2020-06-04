// O Knex, iniciando com letra maiuscula, serve para indicar que estamos importando o tipo
import Knex from 'knex';

//Usada para realizar alterações no banco de dados
export async function up(knex: Knex) {
    
    //Definição dos campos da tabela 'items'
    return knex.schema.createTable('items',table => {
        table.increments('id').primary;
        table.string('image').notNullable;
        table.string('title').notNullable;
    });

}

//usada para voltar atrás em uma alteração feita no banco de dados
export async function down(knex: Knex) {
    
    //Deleta a tabela points
    return knex.schema.dropTable('items');
}