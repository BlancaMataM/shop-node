import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarInterface } from './interfaces/carrito.interface';
import { CreateCartDTO } from './dto/carrito.dto';
import { CreateProductDTO } from 'src/product/dto/product.dto';
import { ProductInterface } from 'src/product/interfaces/product.interface';
const mongoose = require('mongoose');
@Injectable()
export class ShopCartService {

    constructor(
        @InjectModel('Car') private readonly carModule: Model<CarInterface>, 
        @InjectModel('Product') private readonly productModel: Model<ProductInterface> ){}

    async createCar(createCartDTO: CreateCartDTO):Promise<CarInterface> {
        const postCar: any =  await new this.carModule(createCartDTO);
        return await postCar.save();
    }

    
  
    async updateCar(carID: string, createProductDTO: CreateProductDTO): Promise<ProductInterface> {
        const updateProduct: any = await this.carModule.findByIdAndUpdate( carID, {$push: {aJsnProduct: {createProductDTO} } }, {new: true});
        return await updateProduct;
    }

    async getProduct(carID: string): Promise<ProductInterface> {

        const product: any = await this.carModule.findById(carID);
        return product
    }
}