var nodemailer = require('nodemailer'), 
    config = require('../config'), 
    mailer;


mailer = function (to, subject, message, fn) {

    var mailOpts, smtpTrans;

    // nodemailer configuration
    smtpTrans = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: config.email,
            pass: config.password
        }
    });
    
    // mailing options    
    mailOpts = {
        from: config.from,
        replyTo: config.email,
        to: to,
        subject: subject,
        html: message
    };
    
    
    // Send maail    
    smtpTrans.sendMail(mailOpts, function (error, response) {
        //if sending fails
        if (error) {
            fn(true);
        }
        //Yay!! message sent
        else {
            fn(false);
        }
    });
};

module.exports = mailer;