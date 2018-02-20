const nodemailer = require('nodemailer');
const emailConfig = require('./../config/email');
module.exports = (orderDetails) => {
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(emailConfig);

        // setup email data with unicode symbols
        let mailOptions = {
            from: `[Магазин Красота и Здраве] <${emailConfig.auth.user}>`, // sender address
            to: `${orderDetails.email}`, // list of receivers
            subject: 'Регистрирана поръкч на ' + orderDetails.name, // Subject line
            //text: 'Hello world?', // plain text body
            html: `<b><u>Здравей ${orderDetails.name} </u></b> <br>
                    <p>Вие успешно направихте поръчка в онлайн Магазин красота и здраве</p>
                    <p>В рамките на 3 работни дена ще ви бъде доставена поръчката</p>
                    <p>Ще получите ново писмо веднага след като Вашата поръчка бъде изпратена</p>
                    <b>Магазин Красота и здраве</b>

            ` // html body
        };   
        
        let mailOptions2 = {
            from: `[Магазин Красота и Здраве] <${emailConfig.auth.user}>`, // sender address
            to: `krasiv_zdrav@abv.bg`, // list of receivers
            subject: 'Нова поръчка ' + orderDetails.name, // Subject line
            //text: 'Hello world?', // plain text body
            html: `<b><u>Здравей ${orderDetails.name} </u></b> ` // html body
        }; 

        transporter.sendMail(mailOptions);
        transporter.sendMail(mailOptions2);
    })
}
