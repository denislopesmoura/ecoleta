import express from 'express';
import routes from './routes';
import path from 'path';
import cors from  'cors';

const app = express();
const uploadsFolder = path.resolve(__dirname,'..', 'uploads')

// Que todas URL acessem a aplicação, sem usar o 'localhost:[porta]
app.use(cors());

//permite que o express reconheça o body de requisições POST quando for do tipo JSON
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(uploadsFolder))

app.listen(3333);