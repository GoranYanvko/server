const mongoose = require('mongoose');

const ProductShema = mongoose.Schema({
    title: {type:String, require:true},
    type: {type:String, required:true},
    img: {type:String, require:true},
    zakupnaCena: {type:Number, require:true},
    price: {type:Number, require:true},
    quality: {type:Number, require:true},
    description: {type:String, require:true},
    prednaznachenie: {type:Array, required:true},
    sydyrjanie: {type:String, required:true},
    url: {type:String, require:true, unique:true},
    onFirstPage: {type:Boolean, default:false},
    tags: {type:String, require:false},
    promotion:{type:Boolean},
    upotreba: {type:String},
    keywords: {type:Array}
})

const Product = mongoose.model('Product',  ProductShema);

module.exports = Product;