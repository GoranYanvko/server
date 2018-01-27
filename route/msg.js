const express = require('express');
const router = express.Router();
const Msg = require('./../models/Msg').model('Msg');
const mongoose = require('mongoose');
const passport = require('passport');

router.post('/sendMsg', (req, res, next) => {
    let newMsg = new Msg(req.body);
    let err = false;
    for (let i in newMsg) {
        if(req.body[i] === '') {
            err = true;
        }
        if(err) {
            break;
        }
    }
    if(err) {
        res.json({success: false, msg: 'Sorry Dude'})
    } else {
    newMsg.save((err, info)=>{
        if(err) {
            res.json({success: false, msg: 'Sorry Dude'})
        } else {
            res.json({success: true, msg: 'Ok'})
        }
    });
}

})

router.get('/getMsg', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Msg.find({isActive:true}).sort({_id:-1}).then(
        msgs=>{
            if(msg) {
            res.json({success: true, msgs:msgs})
            } else {
                res.end();
            }
        } 
    )
})

router.get('/getMsgCount', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Msg.find({isActive:'true'}).count().then(
        count=>{
            res.json({success: true, count})
        } 
    )
});

router.get('/getAllMsg', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Msg.find({}).sort({_id:-1}).then(
        msgs=>{
            res.json({success: true, msgs})
        } 
    )
})

router.post('/deleteMsg', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Msg.remove({_id:req.body.id}).then((err)=> {
        if(err) {
            res.json({success: true})
        } else {
            res.json({success: false})
        }
    })
})

router.post('/readMsg', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Msg.update({_id:req.body.id}, {isActive:false}).then((err)=> {
        if(err) {
            res.json({success: true})
        } else {
            res.json({success: false})
        }
    })
})

router.post('/unReadMsg', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Msg.update({_id:req.body.id}, {isActive:true}).then((err)=> {
        if(err) {
            res.json({success: true})
        } else {
            res.json({success: false})
        }
    })
})


module.exports = router;