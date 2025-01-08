import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title:{
        type:String,
        required : true
    },
    description:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type: String,
    }
},{
    timestamps:true,
    collection : 'products'
});

export default model('Product',productSchema);