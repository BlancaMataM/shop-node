import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    strName: {
        type: String, 
        required: true
    },
    strEmail: {
        type: String, 
        required: true
    },
    strPassword: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});