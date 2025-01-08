import { Router } from "express";
import Product from '../models/product.js';
import Cloudinarymidd from '../middleware/multer.js'
export const productRoute = new Router();

productRoute.get('/', async (req , res, next)=>{
    try {
        const allImages = await Product.find();
        console.log(allImages)
        res.send(allImages);
    } catch (error) {
        console.log(error)
    }
});

productRoute.post('/newProduct', async (req,res,next)=>{
    try {
        
        let newProduct = await Product.create(req.body);
        console.log(newProduct)
        res.send(newProduct);
    } catch (error) {
        console.log(error)
    }
})

productRoute.patch('/newProduct/:id', Cloudinarymidd, async (req, res, next) => {
    try {

        // console.log(req.body);
        if (req.file) {
            
            let updateProg = await Product.findByIdAndUpdate(req.params.id, {
                ...req.body.product,
                image: req.file.path
            },
                { new: true }
            );
    
            res.send(updateProg);
        } else {
            res.send('errore con immagine');
        }
    } catch (error) {
        next(error);
    }
})

productRoute.delete('/:id', async (req,res,next)=>{
    try {
        
        let product = await Product.findByIdAndDelete(req.params.id);
        res.send(product);

    } catch (error) {
        next(error);
    }
})

productRoute.put('/:id',Cloudinarymidd, async (req,res,next) =>{
    try {
        
        let productUpdated = await Product.findByIdAndUpdate(req.params.id,{...req.body},{
            new: true
        });
        console.log(productUpdated);
        res.send(productUpdated);

    } catch (error) {
        next(error);
    }
})


productRoute.patch('/:id', Cloudinarymidd, async (req, res, next) => {
    try {

        let productUpdated = await Product.findByIdAndUpdate(req.params.id, {
            ...req.body.product,
            image: req.file.path
        },
            { new: true }
        );

        res.send(productUpdated);
    } catch (error) {
        next(error);
    }
})