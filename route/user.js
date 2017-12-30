const express = require('express');
const router = express.Router();
const User = require('./../models/User.js')
const passport = require('passport')
const jswt = require('jsonwebtoken')

const config = require('./../config/db')

const sendMail = false;
const option = require('./../config/options')

router.get('/', (req,res)=>{
    res.json({success:true, msg:'Сървара работи'})  
})

router.post('/register', (req,res)=>{
    User.findOne({'username': req.body.username}).then(user=>{
        if(user) {
          res.json({success:false, msg:'Вече съществува такъв потребител'})  
        } else {
            let newUser = new User(req.body);
            User.addUser(newUser);
            if(option.mail) {
               require('./../addons/mail')('register', newUser)
            }
               res.json('Регистрацията премина успешно имате изпратена поща')
             res.end();         
        }
    })
})

router.post('/login', (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username}).then(user=>{
       if(user) {
           User.chekPass(password, user.password, (err, isMatch)=>{
               if(isMatch) {
                   const token = jswt.sign({data: user}, config.secret, {
                       expiresIn: 60*60*12 //sled kolko vreme izti4a
                   });
                   return res.json({success:true,token:'JWT ' + token, user})
               } else {
                return res.json({success:false, msg: "Не успешен вход"})
               }
           })
       } else {
        return res.json({success:false, msg: "Не успешен вход"})
       }
    
    })
  
})

router.post('/new', passport.authenticate('jwt', {session:false}), (req,res,next)=>{
    
   res.json('ok')
})


module.exports = router;