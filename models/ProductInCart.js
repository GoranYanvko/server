const mongoose = require('mongoose');

const ProductInCartShema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Product'},
    qty: {type: Number, required:true, default:1},
    idString: {type:String, require:true}
  });


  const ProductInCart = mongoose.model('ProductInCart', ProductInCartShema)

module.exports = ProductInCart