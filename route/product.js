const express = require('express');
const router = express.Router();
const Product = require('./../models/Product').model('Product')
const passport = require('passport')

router.post('/add', passport.authenticate('jwt', {session:false}), (req,res,next)=>{
    let title = req.body.title;
    Product.findOne({'title':title}).then(product=>{
        if(product) {
            res.json({success:false, msg: 'Вече съществува продукт с това име'});
            res.end();
        } else {
            let newProduct = new Product(req.body)
            newProduct.save(err =>{
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

 router.post('/getHomeProducts', (req,res,next)=>{
    Product.find({onFirstPage:true}).limit(req.body.numOfProducts).then(products=>{
       if(products) {
           res.json({success:true, msg: `Резултатите ${req.body.numOfProducts}`, products});
           res.end();
       }
    })
})

router.post('/getSingleProduct', (req,res,next)=>{
    Product.findOne({url:req.body.url}).then(product=>{
       if(product) {
           res.json({success:true, msg: `Успешно намерен продукт`, product});
           res.end();
       } else {
        res.json({success:false, msg:'Няма съвпадения'});
        res.end();
       }
    })
})


router.get('/all', passport.authenticate('jwt', {session:false}), (req,res,next)=>{
    Product.find({}).then(products=>{
        if(products) {
            res.json({success:true, msg: 'Върнати са всички продукти', products});
        } else {
            res.json({success:false, msg: 'Не са намерени продукти в базата данни'});
        }
    })
 })

 router.post('/delete', passport.authenticate('jwt', {session:false}), (req,res, next)=>{
    if(!req.body.id) {
        res.json({success: false, msg: 'Грешка'});
    } else  {
        Product.remove({'_id':req.body.id}).then(info=>{
            res.json({success:true, msg: 'ok'});
        })
    }
 })

 router.post('/update', passport.authenticate('jwt', {session:false}), (req,res, next)=>{
    if(!req.body.id) {
        res.json({success: false, msg: 'Грешка'});
    } else  {
        Product.update({'_id':req.body.id}, req.body.product).then(info=>{
            if(info.ok === 1) {
                res.json({success:true, msg: 'ok'});
            }  
        })
    }
 })

 router.post('/getProductByTag', (req,res, next)=>{
    if(!req.body.tag) {
        res.json({success: false, msg: 'Грешка'});
    } else  {
        Product.find({keywords:req.body.tag}).limit(3).then(products=>{
            res.json({success: true, products:products});
        })
    }
 })

 router.post('/randomProduct', (req,res, next)=>{
    if(!req.body.qty) {
        res.json({success: false, msg: 'Грешка'});
    } else  {
        Product.aggregate([ { $sample: { size: 3} } ]).then(allProducts=>{
            let products = []
            for (let product of allProducts) {
                let obj = {}
                obj.img = product.img;
                obj.title = product.title;
                obj.type = product.type;
                obj.shortDescription = product.shortDescription;
                obj.url = product.url;
                products.push(obj);
            }       
            res.json({success: true, products:products});
        })
    }
 })



module.exports = router;
