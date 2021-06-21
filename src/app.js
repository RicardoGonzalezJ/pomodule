import express from 'express';
import logger  from 'morgan';
import { itemList } from './controller.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.end('<h1>Hello po module</h1>')
});

app.get('/itemlist', itemList);

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

export default app;

