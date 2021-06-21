import express from 'express';
import logger  from 'morgan';

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.end('<h1>Hola po module</h1>');
});
export default app;

