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
            console.log(123123123)
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

module.exports = router;
