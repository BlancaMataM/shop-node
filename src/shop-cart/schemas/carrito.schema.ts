import { Schema } from 'mongoose';
import { ProductSchema } from 'src/product/schemas/product.schema';

export const CarSchema = new Schema({
   aJsnProductos: [ProductSchema],
    createdAt: {
        type: Date, 
        default: Date.now
    }
});