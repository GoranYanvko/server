const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport')
const session = require('express-session');
const cookiParser = require('cookie-parser')

const db = require('./config/db')

const app = express();
//Allowed cors
app.use(cors())

mongoose.Promise = global.Promise
mongoose.connect(db.database, {useMongoClient: true}, (err)=>{
    if(err) {
        console.log(err);
        console.log('Има проблем с базата данни');
    } else {
    console.log('ДБ е свръзана');
    }
})
app.use(passport.initialize());
app.use(passport.session())
require('./config/passport')(passport)

app.use(bodyParser.json())



//Routs defination
const user = require('./route/user')
const email = require('./route/email')
const product = require('./route/product')
const orders = require('./route/orders')
const article = require('./route/article')
const cart = require('./route/cart')
app.use('', user)
app.use('/email', email)
app.use('/product', product)
app.use('/orders', orders)
app.use('/article', article )
app.use('/cart', cart )

//404 Not Found
app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found');
    res.end();
});



const port = Number(process.env.PORT || '3001');;

app.listen(port, ()=>{
    console.log('Сървара е пуснат на порт ' + port)
})