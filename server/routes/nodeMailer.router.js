const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


// Create a SMTP transport object
const transport = nodemailer.createTransport("SMTP", {
    //service: 'Gmail', // use well known service.
    // If you are using @gmail.com address, then you don't
    // even have to define the service name
    auth: {
        user: process.env.YOUR_EMAIL_ADDRESS, 
        pass: process.env.PASSWORD_FOR_EMAIL
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
    

router.post('/send', (req, res, next) => {
    const company_name = req.body.company_name
    // for demonstration emails will be sent to this address regardless of user input
    const email = process.env.YOUR_EMAIL_ADDRESS
    const password = req.body.password
    const content = `name: ${company_name} \n email: ${email} \n password: ${password} `

    const mail = {
        from: name,
        to: process.env.YOUR_EMAIL_ADDRESS, //Change to email address that you want to receive messages on
        subject: 'New Message from Contact Form',
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
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