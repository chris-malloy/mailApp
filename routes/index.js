var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('../config/config')

var transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: creds.USER,
        pass: creds.PASS,
    }
};

// make transporter
var transporter = nodemailer.createTransport(transport);

// pass verify method against transporter
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages.');
    };
});

/* GET home page. */
router.get('/', function(req, res, next) {
    var message = '';
    if (req.query.msg != undefined) {
        message = req.query.msg;
    }
    res.render('index', {
        title: 'Mail App',
        message: message,
    });
});

router.post('/send', (req, res) => {
    var email = req.body.email;
    var content = req.body.content;
    var name = req.body.name;
    var phone = req.body.phone;
    var finalMessage = `${content} \n\n phone: ${phone} \n email: ${email}`;

    // nodemailer object
    var mail = {
        from: 'Cuff Malloy',
        to: 'chrismalloymusic@gmail.com',
        subject: 'test',
        text: finalMessage
    };

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log(err);
            res.redirect('/?msg=fail');
        } else {
            console.log('SUCCESSSSSSSSSS!');
            res.redirect('/?msg=SUCCESSSSSSSSSS');
        }
    });
});
module.exports = router;