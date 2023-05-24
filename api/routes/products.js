const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://aaa2002:" + process.env.MONGO_ATLAS_PW + "@rest-api-shop.mfayt2v.mongodb.net/?retryWrites=true&w=majority");

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    //we create a new instance of a product
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /products',
            createdProduct: product
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });


});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
        console.log("From database:", doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid object found for specified ID.'});
        }
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:productId', (req, res, next) => {

    res.status(200).json({
        message: 'Updated product'
    });

});

router.delete('/:productId', (req, res, next) => {

    res.status(200).json({
        message: 'Deleted product'
    });

});
module.exports = router;