const mongoose = require('mongoose');
const ProductInCart = require('./ProductInCart').model('ProductInCart');


const CartShema = mongoose.Schema({
    product: [{type:mongoose.Schema.Types.ObjectId, require:true, ref:'ProductInCart'}],
    userIp: {type:String, require:true},
    status: {type:String, required:true, default: 'Активна'},
    date: {type: Date, default: new Date()},
    idString: {type:String, require:true},
})

const Cart = mongoose.model('Cart',  CartShema);

module.exports = Cart;