import { Router } from "express";
import emailSend from "../middleware/mail.js";

export const mailRoute = Router();


mailRoute.post('/', emailSend,  async (req,res,next)=>{
    try {

        console.log('Email inviata con successo');
        res.send(JSON.stringify({res : 'Email inviata con successo'}));

    } catch (error) {
        next(error);
    }
});