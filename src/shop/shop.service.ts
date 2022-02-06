import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopDTO } from './dto/shop.dto';
import { ShopInterface } from './interfaces/shop.interface';

@Injectable()
export class ShopService {
    constructor(@InjectModel('Shop') private readonly  shopModel: Model<ShopInterface>) {}
    async getShops(): Promise<ShopInterface[]> {
        const shops: any = await  this.shopModel.find({ blnActive: true });
           return shops;
       }
   
       async getShop(shopID: string): Promise<ShopInterface> {
        const shop: any = await this.shopModel.findById(shopID);
        return shop;
    }
      async getFoundShop(strName: string): Promise<ShopInterface> {
   
       const found: any  = await this.shopModel.findOne({strName: strName});
       return await found;
          
      }
       async createShop(shopDTO: ShopDTO):Promise<ShopInterface> {
           const postShop: any =  await new this.shopModel(shopDTO);
           return await postShop.save();
         
       }
   
       async deleteShop(shopID: string, blnActive: boolean): Promise<ShopInterface>{
           const deleteShop: any = await this.shopModel.findByIdAndUpdate( shopID, {$set: { blnActive }}, {new: true});
           return await deleteShop;
       }
   
       async updateShop(shopID: string, shopDTO: ShopDTO): Promise<ShopInterface> {
           const updateShop: any = await this.shopModel.findByIdAndUpdate( shopID, {$set: shopDTO}, {new: true});
           return await updateShop;
       }
   }
   