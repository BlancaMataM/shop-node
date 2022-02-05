import { Body, Controller, Post, Query, Res } from '@nestjs/common';
import { CarDTO } from './dto/carrito.dto';
import { ShopCartService } from './shop-cart.service';

@Controller('api/car')
export class ShopCartController {
    constructor(private shopCartService: ShopCartService) {}
    @Post('/')
    async createPost(@Res() res, @Body() carDTO: CarDTO,  @Query('productID') productID) {
      try {
        //   console.log('e');
        // const carrito = [];
        // const product: any = await this.shopCartService.addProduct(carDTO._id);
        // console.log(product);
        // if(product == -1) {
        //     const data = {
        //         id: product._id,
        //         strName: product.strName,
        //         strPrice: product.strPice,
        //         cantidad: 1,
        //     };

        //     carrito.push(data);
        // } else {
        //     const dat = carrito[product];
        //     dat.cantidad = dat.cantidad + 1;
        //     dat.precioTotal = dat.price * dat.cantidad;
        //     carrito[product] = dat;
        // }

        const resp: any = await this.shopCartService.updateShop(productID, { aJsnEstado: carDTO } );
        console.log(resp); 
          
      } catch (err) {

        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error al intentar consultar las Tiendas.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
      }
    }
}
