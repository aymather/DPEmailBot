// Requires
var nodemailer = require('nodemailer');

// Create send mail function
module.exports = function sendMail(who, subject_, html_){

    // Create transport service
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aymather@gmail.com',
            pass: 'wheninrome12345'
        }
    });

    // Place data into variable mailOptions
    var mailOptions = {
        from: 'aymather@gmail.com',
        to: who,
        subject: subject_,
        html: html_
    };

    // Actually send the mail using the transporter
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
};