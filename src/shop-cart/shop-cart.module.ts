import { Module } from '@nestjs/common';
import { ShopCartService } from './shop-cart.service';
import { ShopCartController } from './shop-cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './schemas/carrito.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Car', schema: CarSchema },
    ])
  ],
  providers: [ShopCartService],
  controllers: [ShopCartController]
})
export class ShopCartModule {}
