const mongoose = require('mongoose');

const OrderShema = mongoose.Schema({
    firstName: {type:String, require:true},
    lastName: {type:String, require:true},
    phone: {type:Number, require:true},
    email: {type:String, require:true},
    city: {type:String, require:true},
    address: {type:String, require:true},
    delivary: {type:String, require:true},
    status: {type:String, default: 'Подадена'},
    confirmConditions: {type:String, require:true},
    date: {type: Date, default: Date.now},
    product: {type: mongoose.Schema.Types.ObjectId, require:true, ref: 'Product'}
})

const Order = mongoose.model('Order',  OrderShema);

module.exports = Order;