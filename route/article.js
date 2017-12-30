const express = require('express');
const router = express.Router();
const Article = require('./../models/Article').model('Article');
const passport = require('passport');

const option = require('./../config/options')


router.post('/add', passport.authenticate('jwt', {session:false}), (req,res,next)=>{
    let title = req.body.title;
    Article.findOne({'title':title}).then(product=>{
        if(product) {
            res.json({success:false, msg: 'Вече съществува статия с това име'});
            res.end();
        } else {
            let newArticle = new Article(req.body)
            newArticle.save(err =>{
                if(err) {
                    res.json({success:false, msg: 'Полетата не са попълнени коректно'})
                    res.end();
                } else {
                    res.json({success:true, msg: 'Успешно добавен продукт'})
                    res.end();
                }
            })
        }
    })
 })



 router.post('/getArticle', (req,res,next)=>{
     let skip;
     if(req.body.skip === undefined || req.body.skip === undefined) {
         skip=0;
     }else {
         skip = req.body.skip;
     }

     Article.find({}).sort({"_id":-1}).skip(skip).limit(req.body.numOfArticle).then(articles=>{
        if(articles) {
            res.json({success:true, msg: 'Последните 5 статии', articles});
            res.end();
        }
     })
 })

 router.get('/getCount', (req,res,next)=>{
    Article.count({}).then(count=>{
       if(count) {
           res.json({success:true, msg: 'Общия брой стати', count});
           res.end();
       } else {
        res.json({success:false, msg: 'Възникна грешка'});
       }
    })
})

router.post('/singlArticle', (req,res,next)=>{
    if(!req.body.url) {
        res.json({success:false, msg: 'Статията не съществува'});
    }else {
    Article.findOne({'url':req.body.url}).then(article=>{
       if(article) {
           res.json({success:true, msg: 'Успешно намерена статия', article});
           res.end();
       } else {
        res.json({success:false, msg: 'Статията не съществува'});
       }
    })
}
})



module.exports = router;
