// Requires
var nodemailer = require('nodemailer');

// Create send mail function
module.exports = function sendMail(who, publishedOn, href, name){

    // Create transport service
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aymather@gmail.com',
            pass: 'admwinwtf1997'
        }
    });

    // Place data into variable mailOptions
    var mailOptions = {
        from: 'aymather@gmail.com',
        to: who,
        subject: `Congrats ${name}! You've been republished!`,
        html: `<p>Dear ${name},</p><p>Congrats! One of your Quora answers has been republished by <a href="${href}">${publishedOn}</a>!</p><p>Keep Sharing!<br>Digital Press Team</p>`
    };

    // Actually send the mail using the transporter
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
};