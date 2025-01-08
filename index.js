import express from 'express'
import { config } from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { productRoute } from './routes/productRoute.js';
import { mailRoute } from './routes/mailRoute.js';


config();

const server = express();

server.use(cors());

server.use(express.json());

server.use('/products',productRoute);
server.use('/mail',mailRoute);


const initialServer = async () => {
    try {

        mongoose.connect(process.env.MONGO_URL_REMOTE);
        console.log('Connesso al Database');

        server.listen(process.env.PORT, () => {
            console.log('Server in ascolto alla porta ' + process.env.PORT)
        })
    } catch (error) {
        console.log('errore di connessione al Database');
    }
}

initialServer();