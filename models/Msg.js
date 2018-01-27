const mongoose = require('mongoose');

const MsgShema = mongoose.Schema({
    name: { type:String, required: true},
    email: {type: String, required:true},
    phone: {type:String, require:true},
    title: {type:String, require:true},
    msg: {type:String, require:true},
    isActive: {type:String, default: 'true'}
  });
  const Msg = mongoose.model('Msg', MsgShema)

module.exports = Msg;