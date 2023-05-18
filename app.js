const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const {response} = require("express");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); //false -> simpler url encoded bodies
app.use(bodyParser.json());

//Middle-ware for handling CORS (preventing them)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //'*' = giving access to everyone
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); //TODO: read on these
    if (req.method === 'OPTIONS') { //browsers always send options request first for get or put requests
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return response.status(200).json({});
    }
    next();
});

//Routes handling requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//Error handling - catch all requests that make it pasts our handled requests
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); //forwards our err request rather than the original
});

app.use((error, req, res, next) => {
    res.status(error.status || 500); //either catches defined errors or throws err code 500
    res.json({
        error: {
            message: error.message
        }
    });
})

module.exports = app;