const router = require('express').Router();
const nodemailer = require('nodemailer');

module.exports = async (options, user) => {
    let mailOptions = {}
    let transporter = nodemailer.createTransport({
        host: 'smtp.abv.bg', port: 465, secure: true, // true for 465, false for other ports
        auth: {
            user: 'rusenez@abv.bg', // generated ethereal user
            pass: 'goran415' // generated ethereal password
        }
    });

    if (options === 'register') {
        // setup email data with unicode symbols
       mailOptions = {
            from: '"Магазин красота и здраве" <rusenez@abv.bg>', // sender address
            to: `${user.email}`, // list of receivers
            subject: 'Успешна регистрация', // Subject line
            text: 'Здравейте, вие успешно се регистрахте в нашия сайт', // plain text body
            html: '<b>Здравейте, вие успешно се регистрахте в нашия сайт</b>' // html body
        };
    } else if (options === 'order')  {
         // setup email data with unicode symbols
         mailOptions = {
            from: '"Магазин красота и здраве" <rusenez@abv.bg>', // sender address
            to: `${user.email}`, // list of receivers
            subject: 'Приета поръчка', // Subject line
            text: 'Здравейте, Вие успешно направихте поръчка', // plain text body
            html: '<b>Здравейте, Вие успешно направихте поръчка</b>' // html body
        };
    }

    await transporter
        .sendMail(mailOptions).then(data => {
            return true;
        })
        .catch((err) => {
            return false;
        })

}