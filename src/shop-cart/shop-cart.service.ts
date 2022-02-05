import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopInterface } from 'src/shop/interfaces/shop.interface';
import { ShopCartModule } from './shop-cart.module';
import { ProductModule } from '../product/product.module';

@Injectable()
export class ShopCartService {
    constructor(@InjectModel('Car') private readonly ShopCartModule: Model<ShopInterface> ) {}

    async updateShop(producID: string, productModule : ProductModule): Promise<ShopInterface> {
        const updateShop: any = await this.ShopCartModule.findByIdAndUpdate( producID, {$set: productModule}, {new: true});
        return await updateShop;
    }
}