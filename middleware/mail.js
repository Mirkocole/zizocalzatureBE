import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: "steviecolella@gmail.com",
        pass: "zuim yjcv dqrs burj",
    },
});

 async function emailSend  (req, res, next) {
    try {
        
        let mailSend = await transporter.sendMail({
            from: '"Zizo Calzature website 💻" <mirkocole92@gmail.com>', // sender address
            to: req.body.Email, // list of receivers
            subject: `Messagio da ${req.body.Name} ${req.body.Lastname}`, // Subject line
            text: req.body.Message, // plain text body
            html: `<b>${req.body.Message}</b>`, // html body
            
        })
        
        next();
    } catch (error) {
        next(error);
    }
}

export default emailSend;