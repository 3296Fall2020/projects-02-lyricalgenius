const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lyricalgeniusapi@gmail.com',
        pass: '4bWW1uz50vx7',
    }
});

let sendEmail = async function (address, message) {

    if (!(typeof address === 'string')) return false;

    if (Array.isArray(message)) { // Multiple messages

        for (let i = 0; i < message.length; i++) {

            let mesg = message[i];
            if (!(typeof mesg === 'string')) return false;

            let options = {
                from: '"Lyrical Genius" <lyricalgeniusapi@gmail.com>',
                to: address,
                subject: 'Lyrical Genius',
                text: mesg
            };

            await transporter.sendMail(options, function (err, data) {
                return !err;
            });
        }

    } else if (typeof message === 'string') { // Single message

        let options = {
            from: '"Lyrical Genius" <lyricalgeniusapi@gmail.com>',
            to: address,
            subject: 'Lyrical Genius',
            text: message
        };

        await transporter.sendMail(options, function (err, data) {
            return !err;
        });

    }

}

module.exports = {sendEmail};

//sendEmail("tuk97813@temple.edu", ["Test1", "Test2"]);