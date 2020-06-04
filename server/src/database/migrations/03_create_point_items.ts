// O Knex, iniciando com letra maiuscula, serve para indicar que estamos importando o tipo
import Knex from 'knex';

//Usada para realizar alterações no banco de dados
export async function up(knex: Knex) {
    
    //Definição dos campos da tabela 'items'
    return knex.schema.createTable('point_items',table => {
        table.increments('id').primary;

        //Cria uma chave estrangeira para a coluna 'id' da tabela 'points'
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');

        //Cria uma chave estrangeira para a coluna 'id' da tabela 'items'
        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items');
    });

}

//usada para voltar atrás em uma alteração feita no banco de dados
export async function down(knex: Knex) {
    
    //Deleta a tabela points
    return knex.schema.dropTable('point_items');
}