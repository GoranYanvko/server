const express = require('express');
const router = express.Router();
const Slider = require('./../models/Slider').model('Slider');
const passport = require('passport');

router.get('/', (req, res, next) => {
        Slider.find({}).sort({_id:-1}).limit(5)
            .then(slider => {
                if (slider) {
                    res.json({success: true, msg: 'Успешно намерена info', slider});
                    res.end();
                } else {
                    res.json({success: false, msg: 'Няма Slider не съществува'});
                }
    })
})

router.post('/saveSlider', passport.authenticate('jwt', {session:false}), (req,res, next)=>{
    if(!req.body.url || !req.body.img || !req.body.title) {
        res.json({success: false, msg: 'Грешка'});
    } else {
        if (req.body.url === '' || req.body.img === '' || req.body.title === '') {
            res.json({success: false, msg: 'Грешка'});
        }
        else {
            let newSlider = new Slider(req.body);
            newSlider.save().then(err=>{
                res.json({success: true, msg: 'Успешно добавен Слайдар', newSlider})
            })
        }
    }
 })

 router.post('/delete', passport.authenticate('jwt', {session:false}), (req,res, next)=>{
    if(!req.body.id) {
        res.json({success: false, msg: 'Грешка'});
    } else  {
        Slider.remove({'_id':req.body.id}).then(info=>{
            res.json({success:true, msg: 'ok'});
        })
    }
 })

 router.post('/update', passport.authenticate('jwt', {session:false}), (req,res, next)=>{
    if(!req.body.id) {
        res.json({success: false, msg: 'Грешка'});
    } else  {
        Slider.findById(req.body.id).then(slider=>{
            if(slider) {
                slider.title = req.body.slider.title;
                slider.img = req.body.slider.img;
                slider.url = req.body.slider.url;
                slider.save().then(ok=>{
                    res.json({success:true, msg: 'ok'});
                })
            }      
        })
    }
 })


module.exports = router