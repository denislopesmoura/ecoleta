import knex from '../database/connection';
import {Request, Response} from 'express';


class ItemsController {

    async index(request: Request,response: Response){

        const items = await knex('items').select('*');
        
        //Altera a estrutura,só para visualização, dos items
        const serializedItems = items.map(item =>{
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`,
            };
        });
    
        return response.json(serializedItems);
    }

};

export default ItemsController;