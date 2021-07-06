import express from 'express';
import logger  from 'morgan';
import { itemList, getDataToAddNewOrder, addNewOrder } from './controller.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res, next) => {
    res.end(`<h1>Welcome to po module</h1>
             <h2>This is the back-end</h2>`);
});

app.get('/itemlist', itemList);
app.get('/getdatatoaddneworder', getDataToAddNewOrder);
app.post('/addneworder', addNewOrder);

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

export default app;

