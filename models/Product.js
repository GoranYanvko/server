const mongoose = require('mongoose');

const ProductShema = mongoose.Schema({
    title: {type:String, require:true},
    description: {type:String, require:true},
    img: {type:String, require:true},
    tags: {type:String, require:true},
    price: {type:Number, require:true},
    promotion:{type:Boolean}
})

const Product = mongoose.model('Product',  ProductShema);

module.exports = Product;