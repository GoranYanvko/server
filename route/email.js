const router = require('express').Router();

router.get('/', (req, res) => {
    let emailTo = 'alabama415@abv.bg';
    require('./../email/order-email')(emailTo);
        res.send('505');   
})

module.exports = router;
