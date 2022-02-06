import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { LoginService } from './login/login.service';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';
import { ShopCartModule } from './shop-cart/shop-cart.module';



@Module({
  imports: [
    ProductModule, 
    ShopModule,
    MongooseModule.forRoot('mongodb://localhost/bdShop'),
    LoginModule,
    ShopCartModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
