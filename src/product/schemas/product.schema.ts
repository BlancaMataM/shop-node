import { Mongoose, Schema } from 'mongoose';
// const mongoose = require("mongoose");
export const ProductSchema = new Schema({
    strName: {
        type: String, 
        required: true
    },
    strDescription: {
        type: String, 
    },
    strFile: {
        type: String,
    } ,
    nmbPrice: {
       type: Number
    },
    blnActive: {
        type: Boolean
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});


;