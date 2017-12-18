const express = require('express');
const router = express.Router();
const Order = require('./../models/Order').model('Order');
const passport = require('passport');


router.post('/', (req,res)=>{
    let newOrder = new Order(req.body);
    newOrder.save(err=>{
        if(err) {
            console.log(err);
            res.json({success: false, msg:'Поръчката не е приета, моля проверете за грешки'})
            res.end();
        } else {
            res.json({success: true, msg:'Поръчката e приета успешно'});
            res.end()
        }
    })
 })

 
router.post('/allOrderToDay', passport.authenticate('jwt', {session:false}), (req,res, next)=>{
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    Order.find({date: {$gte: startOfToday}}).then(data=>{
        console.log(data)
        res.json(data);
    })
 })

 router.post('/allOrderToDay', passport.authenticate('jwt', {session:false}), (req,res, next)=>{
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    Order.find({date: {$gte: startOfToday}}).then(data=>{
        console.log(data)
        res.json(data);
    })
 })

 
module.exports = router;
