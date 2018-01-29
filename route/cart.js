const express = require('express');
const router = express.Router();
const Cart = require('./../models/Cart').model('Cart');
const ProductInCart = require('./../models/ProductInCart').model('ProductInCart');
const mongoose = require('mongoose')

router.post('/newCart', (req, res, next) => {   
    req.body.product.idString = Math.random().toString(36).slice(2);
    let newProductInCart = new ProductInCart(req.body.product);
    newProductInCart.save((err, info) => {
        req.body.product = info;
        req.body.idString = req.body.product.idString;
        let newCart = new Cart(req.body)
        newCart.save((err, cartInfo) => {
            if (err) {
                res.json({success: false, msg: 'Полетата не са попълнени коректно'})
                res.end();
            } else {

                res.json({success: true, msg: 'Успешно добавен продукт в кошницата', cartInfo})
                res.end();
            }
        })
    })
})

router.post('/updateCart', (req, res, next) => {
    let id = req.body.product.product.product;
    Cart
        .findById(req.body.id)
        .populate({
            path: 'product',
            populate: {
                path: 'product'
            }
        })
        .then(data => {    
           ProductInCart
                .findOne({'product': id, 'idString':data.idString})
                .then(product => {
                    if (product) {
                        product.qty = req.body.product.product.qty;
                        product.save((err, cartInfo) => {
                            if (err) {
                                res.json({success: false, msg: 'Полетата не са попълнени коректно'})
                                res.end();
                            } else {                
                                res.json({success: true, msg: 'Успешно добавен продукт в кошницата', cartInfo})
                                res.end();
                            }
                        })
                    } else {
                        req.body.product.product.idString = data.idString;
                        let newProductInCart = new ProductInCart(req.body.product.product);
                        console.log(newProductInCart)
                        newProductInCart.save((err, dataInfo) => {
                            data
                                .product
                                .push(dataInfo)
                                console.log(data)
                            data.save((err, cartInfo) => {
                                
                                if (err) {
                                    res.json({success: false, msg: 'Полетата не са попълнени коректно'})
                                    res.end();
                                } else {     
                                               
                                    res.json({success: true, msg: 'Успешно добавен продукт в кошницата', cartInfo})
                                    res.end();
                                }
                            })
                        })
                    }
                })

        })
})

router.post('/delete', (req, res, next) => {
    let id = req.body.productId;
    Cart
        .findById(req.body.id)
        .populate({
            path: 'product',
            populate: {
                path: 'product'
            }
        })
        .then(data => {    
           ProductInCart
                .remove({'product': id, 'idString':data.idString})
                .then(product => {
                    res.json({success: true, msg: 'Успешно премахнат продукт от кошницата'})
                    res.end();
                })

        })
})

router.post('/getCart', (req, res, next) => {
    Cart.findOne({
        $and: [
            {
                _id: req.body.id
            }, {
                    status: 'Активна'
                }
            ]
    })
    .populate({
        path: 'product',
        populate: {
            path: 'product'
        }
    })
        .then(cart => {
            res.json(cart);
        })
})

module.exports = router;