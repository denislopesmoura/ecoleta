import { Request,Response } from 'express';
import knex from '../database/connection';

class PointsController {

    async index(request: Request,response: Response){

        const {city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'point_items.point_id', '=', 'points.id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);

    };

    async create(request: Request,response: Response){
    
        //Desestruturação do conteúdo
        //Campos necessários para criar um novo 'point'
        const {
            name,
            email,
            whatshapp,
            latitude,
            longitude,
            city,
            uf,
            items
        }= request.body;

        const point = {
            image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatshapp,
            latitude,
            longitude,
            city,
            uf
        }

        //cria uma inserção atômica nas tabelas abaixo. Caso alguma falhe, nenhuma transação é executada
        const trx = await knex.transaction();

        //Cria o novo 'point' no banco de dados
        //O método .insert() retorna todos os Ids após criar o novo ponto.
        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        //Armazena todos os dados necessários para criar um registro na tabela 'point_items'.
        const pointItems = items.map((item_id: number) =>{
            return {
                item_id,
                point_id // como criamos um único ponto, retornamos o primeiro id
            }
        });

        //cria um novo registro na tabela 'point_items'
        await trx('point_items').insert(pointItems);

        await trx.commit();

        return response.json({ 
            id : point_id,
            ...point,
        });

    };

    async show(request: Request, response: Response){

        const { id } = request.params;

        const point = await knex('points').where('id', id).first()
        
        if (!point) return response.status(400).json({ message: "Point not found"});

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');


        return response.json({point,items});
    };

}

export default PointsController;