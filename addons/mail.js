const router = require('express').Router();
const nodemailer = require('nodemailer');

module.exports = async(user) =>{
    console.log(user);
    let transporter = nodemailer.createTransport({
        host: 'smtp.abv.bg', port: 465, secure: true, // true for 465, false for other ports
        auth: {
            user: 'rusenez@abv.bg', // generated ethereal user
            pass: 'goran415' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <rusenez@abv.bg>', // sender address
        to: `${user.email}`, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

   await transporter.sendMail(mailOptions).then(data=>{
        return true;
    }).catch((err)=>{
        return false;
    })

}