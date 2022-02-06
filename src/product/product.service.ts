import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInterface } from './interfaces/product.interface'
import { ProductModule } from './product.module';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly  productModule: Model<ProductInterface>) {}

   async getProducts(): Promise<ProductInterface[]> {
     const products: any = await  this.productModule.find({ blnActive: true });
        return products;
    }

    async getProduct(productID: string): Promise<ProductInterface> {

        const product: any = await this.productModule.findById(productID);
        return product
    }

   async getFoundProduct(strName: string): Promise<ProductInterface> {

    const found: any  = await this.productModule.findOne({strName: strName});
    return await found;
       
   }
    async createProduct(createProductDTO: CreateProductDTO):Promise<ProductInterface> {
        const postProduct: any =  await new this.productModule(createProductDTO);
        return await postProduct.save();
    }

    async deleteProduct(productID: string, blnActive: boolean): Promise<ProductInterface>{
        const deleteProduct: any = await this.productModule.findByIdAndUpdate( productID, {$set: { blnActive }}, {new: true});
        return await deleteProduct;
    }

    async updatePoduct(productID: string, createProductDTO: CreateProductDTO): Promise<ProductInterface> {
        const updateProduct: any = await this.productModule.findByIdAndUpdate( productID, {$set: createProductDTO}, {new: true});
        return await updateProduct;
    }
}
