import { Schema } from 'mongoose';

export const ShopSchema = new Schema({
    strName: {
        type: String, 
        required: true
    },
    strDescription: {
        type: String, 
    },
    blnActive: {
        type: Boolean
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});
