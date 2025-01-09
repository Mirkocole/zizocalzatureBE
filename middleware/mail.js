import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

 async function emailSend  (req, res, next) {
    try {
        // console.log(req.body)
        let mailSend = await transporter.sendMail({
            sender: req.body.email,
            replyTo: req.body.email,
            from: `${req.body.email} "Zizo Calzature website 💻"`, // sender address
            to: process.env.MAIL_USER, // list of receivers
            subject: `Messagio da ${req.body.nome} ${req.body.cognome}`, // Subject line
            text: req.body.messaggio, // plain text body
            html: `<p>
            Nome: ${req.body.nome} <br />
            Cognome: ${req.body.cognome} <br />
            Email: ${req.body.email} <br />
            Telefono: ${req.body.telefono} <br />
            Messaggio:  
            ${req.body.messaggio}
            
            </p>`, // html body
            
        })
        
        next();
    } catch (error) {
        next(error);
    }
}

export default emailSend;