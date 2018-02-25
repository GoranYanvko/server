const mongoose = require('mongoose');

const OrderShema = mongoose.Schema({
    name: {type:String, require:true},
    phone: {type:String, require:true},
    email: {type:String, require:true},
    city: {type:String, require:true},
    address: {type:String, require:true},
    typeOfDelivary: {type:String, require:true},
    status: {type:String, default: 'Подадена'},
    confirmConditions: {type:Boolean, require:true, default: true },
    date: {type: Date, default: Date.now},
    product: [{type: mongoose.Schema.Types.ObjectId, require:true, ref: 'ProductInCart'}],
    econtId : {type:String, require:false, default:''}
})

const Order = mongoose.model('Order',  OrderShema);

module.exports = Order;
