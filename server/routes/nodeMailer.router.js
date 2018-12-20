const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
    

router.post('/', (req, res, next) => {
       console.log('', req.body.name);
       const name = req.body.name;
       // for demonstration emails will be sent to this address regardless of user input
       const username = process.env.YOUR_EMAIL_ADDRESS;
       const password = req.body.password;
       const content = `name: ${name} \n email: ${username} \n password: ${password} `;
       console.log('content for email', content);
    // Create a transporter object
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            user: `${process.env.YOUR_EMAIL_ADDRESS}`,
            pass: `${process.env.PASSWORD_FOR_EMAIL}`
        }
    });
     const mailOptions = {
         from: name,
         to: process.env.YOUR_EMAIL_ADDRESS,
         subject: `Message from ${name}`,
         text: content
     }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
             console.log('error with sending', err);
            res.json({
                msg: 'fail'
            })
        } else {
            console.log('Sent data', data);
            res.json({
                msg: 'success'
            })
        }
    })
})



module.exports = router;