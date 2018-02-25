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
            subject: orderDetails.status + ' поръчка на ' + orderDetails.name, // Subject line
            //text: 'Hello world?', // plain text body
            html: `<b><u>Здравей ${orderDetails.name} </u></b> <br>
                    <p>Информираме Ви, че Вашата поръчка е с нов статус <b>${orderDetails.status}</b></p>
                    <b>Магазин Красота и здраве</b>

            ` // html body
        };   

        if(orderDetails.status === "Изпратена") {
            mailOptions.html = `<b><u>Здравей ${orderDetails.name} </u></b> <br>
            <p>Информираме Ви, че Вашата поръчка е с нов статус <b>${orderDetails.status}</b></p> 
            <p>В рамките на три работни дена, ще ви бъде доставена</p>
            <p> Може да следите движението на Вашата пратка в реално време на следния адрес</p>
            <br />
            <a href="http://www.econt.com/tracking/?num=${orderDetails.econtId}">http://www.econt.com/tracking/?num=${orderDetails.econtId}</a><br/>
            <br />
            <p> Моля да обърнете внимание, че посоченият адрес, ще започне да показва резултати</p>
            <p> <b> <font color="red">След 17.30ч. днес!</b> Преди това ще показва, че не е намерен резултат!</font></p>
            <br/>
            <a href="http://magazin-zdrave.com"><b>Магазин Красота и здраве</b></a>  `
        }
        
        transporter.sendMail(mailOptions);
    
    })
}
