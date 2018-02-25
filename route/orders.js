const express = require('express');
const router = express.Router();
const Order = require('./../models/Order').model('Order');
const Product = require('./../models/Product').model('Product');
const ProductInCart = require('./../models/ProductInCart').model('ProductInCart');
const passport = require('passport');
const option = require('./../config/options')



router.post('/new', (req,res)=>{
    let newOrder = new Order(req.body);
    newOrder.save(err=>{
        if(err) {   
            res.json({success: false, msg:'Поръчката не е приета, моля проверете за грешки'})
            res.end();
        } else {
            if(option.mail) {
                require('./../email/order-email')(newOrder);
            }
           
            let cursor = Product.find({}).cursor()
            cursor.eachAsync(x=> {               
                let q = 0;
                for (let p of req.body.product) {
                 let cursor2 = ProductInCart.findById(p).cursor();
                 cursor2.eachAsync(y=> {
                    x.quality = x.quality - y.qty;
                    x.save();
                 }
                 )
                }
            })
            res.json({success: true, msg:'Поръчката e приета успешно'});
            res.end()
        }
    })
 })

 
router.get('/allOrderToDay', passport.authenticate('jwt', {session:false}), (req,res, next)=>{
    
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
   
    Order.find({date: {$gte: startOfToday}}).then(orders=>{
        res.json({success: true, msg:'Поръчката e приета успешно', orders});
    })
 })

 router.get('/allOrderToMonth', passport.authenticate('jwt', {session:false}), (req,res, next)=>{
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth());
   
    Order.find({date: {$gte: startOfToday}}).then(orders=>{
        res.json({success: true, msg:'Поръчката e приета успешно', orders});
    })
 })

 router.post('/allOrders', passport.authenticate('jwt', {session:false}), (req,res, next)=>{
    Order.find({}).sort({_id:-1})
    .populate({
        path: 'product',
        populate: {
            path: 'product'
        }
    }).limit(100).then(data=>{
        res.json(data);
    })
 })

 router.post('/searchOrder', (req,res, next)=>{
    Order.find({phone: req.body.phone}).populate('product').then(order=>{
        res.json({success: true, msg:'Поръчката e приета успешно', order});
    })
 })

 router.post('/editOrderStatus', passport.authenticate('jwt', {session:false}), (req,res, next)=>{
    Order.findById({_id:req.body.id}).then(order=>{
        order.status = req.body.status;
        if(order.status === "Изпратена" || order.status === "Отказана") { 
            order.econtId = req.body.econtId;
            require('./../email/editOrderStatus-email')(order);
        }
        order.save().then(stats=>{
            res.json({success: true, msg:'Статуса на поръчката е обновен'});
        })
    })
 })


module.exports = router;
