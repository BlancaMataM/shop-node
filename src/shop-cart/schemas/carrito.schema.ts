import { Schema } from 'mongoose';

// export const CarProductSchema = new Schema({
//     idCardProduct: {
//         // type: Mongoose.Types.ObjectId,
//         ref: CarSchema,
//     },
//     createdAt: {
//         type: Date, 
//         default: Date.now
//     }
// })
export const CarSchema = new Schema({
    strName: {
        type: String, 
        required: true
    },
    strDescription: {
        type: String, 
    },
    aJsnProduct: [],
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

