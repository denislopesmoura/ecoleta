import knex from 'knex';
import path from 'path';

//__dirname = retorna o diretório onde o arquivo está sendo executado.

//configuração da conecção com o banco de dados.
const connection = knex({
    client: 'sqlite3',
    connection:{
        filename: path.resolve(__dirname,'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;