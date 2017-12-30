const express = require('express');
const router = express.Router();
const Order = require('./../models/Order').model('Order');
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
                require('./../addons/mail')('order', newOrder)
            }
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
    }).limit(50).then(data=>{
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
        order.save().then(stats=>{
            res.json({success: true, msg:'Статуса на поръчката е обновен'});
        })
    })
 })


module.exports = router;
