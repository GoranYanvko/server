const mongoose = require('mongoose');

const ArticleShema = mongoose.Schema({
    title: {type:String, require:true},
    img: {type:String, require:true},
    url:{type:String, require:true},
    paragraph: {type:Array, required:true},
    date: {type: Date, default: new Date()}
})

const Article = mongoose.model('Article',  ArticleShema);

module.exports = Article;