const router = require('express').Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {

    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
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
            to: 'goran415@abv.bg', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

        transporter.sendMail(mailOptions).then(data=>{
            res.send('bravo');
        }).catch((err)=>{
            res.send(err);
        })

    })
})

module.exports = router;
