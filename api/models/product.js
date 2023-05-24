const { Schema, model } = require('mongoose');
const mongoose = require("mongoose");
// schema
const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

// Create the model
module.exports = mongoose.model('Product', productSchema);
