const mongoose = require('mongoose');

const SliderShema = mongoose.Schema({
    img: { type:String, required: true},
    url: {type: String, required:true},
    title: {type:String, require:true}
  });


  const Slider = mongoose.model('Slider', SliderShema)

module.exports = Slider;