import { Body, Controller, Get, Patch, Post, Query, Res } from '@nestjs/common';
import { ShopCartService } from './shop-cart.service';
import { CreateCartDTO } from './dto/carrito.dto';
import { CreateProductDTO } from '../product/dto/product.dto';

@Controller('api/car')
export class ShopCartController {
    constructor(private shopCartService: ShopCartService) {}
  
    @Get('/')
    async getCarProduct(@Res() res, @Query('carID') carID){
 
            const car: any = await this.shopCartService.getProduct(carID);
            try {
            
                if (!car) return res.status(404).json({
                    ok: false,
                    resp: 404,
                    msg: 'No se encontraron productos para mostrar.',
                    car
                });
                return res.status(200).json({
                    ok: true, 
                    resp: 200, 
                    msg: 'Se han obtenido éxitosamente el producto.', 
                    cont: {
                        car
                    }
                });
            } catch (err) {
                return res.status(500).json({
                    ok: false,
                    resp: 500,
                    msg: 'Error al intentar consultar los productos.',
                    cont: {
                        err: Object.keys(err).length === 0 ? err.message : err
                    }
                });
            }
          
    }
    
    @Post('/')
    async createPost(@Res() res, @Body() createCartDTO: CreateCartDTO) {
      try {
          const product = await this.shopCartService.createCar(createCartDTO);
            return res.status(200).json({
                ok: true, 
                resp: 200, 
                msg: 'Se ha registrado el producto éxitosamente en la base de datos', 
                cont: {
                    product
                }
            });
          
      } catch (err) {

        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error al intentar consultar los productos.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
      }
    }

    @Patch('/')
    async updateCarProduct(@Res() res, @Query('carID') carID ,@Body() createProductDTO:CreateProductDTO){
        try {
            const car: any = await this.shopCartService.updateCar(carID, createProductDTO);
            if (!car) return res.status(404).json({
                ok: false,
                resp: 404,
                msg: 'No se encontraron productos para mostrar.',
                car
            });
            return res.status(200).json({
                ok: true, 
                resp: 200, 
                msg: 'Se ha añadido el producto en el carrito éxitosamente', 
                // count: car.count,
                cont: {
                    car: car
                    
                }
            });
        } catch (err) {
            return res.status(500).json({
                ok: false,
                resp: 500,
                msg: 'Error al intentar consultar los productos.',
                cont: {
                    err: Object.keys(err).length === 0 ? err.message : err
                }
            });
        }
    }
}
