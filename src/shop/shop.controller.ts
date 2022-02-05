import { Controller,Get, Post, Put, Delete, Res, Body, Query } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopDTO } from './dto/shop.dto';

@Controller('api/shop')

export class ShopController {
    constructor(private shopService: ShopService) {
    }
    @Post('/')
    async createPost(@Res() res, @Body() shopDTO: ShopDTO) {
      try {
          console.log('holaaaaa');
          const found = await this.shopService.getFoundShop(shopDTO.strName)
          if (found) {
              return res.status().json({
                ok: false,
                resp: 400,
                msg: `El Tienda ${found} ya se encuentra registrado.`,
                cont: {
                    found
                }
              })
          }
          const shop = await this.shopService.createShop(shopDTO);
            return res.status(200).json({
                ok: true, 
                resp: 200, 
                msg: 'Se ha registrado la Tienda éxitosamente en la base de datos', 
                cont: {
                    shop
                }
            });
          
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

    @Get('/')
    async getShops(@Res() res) {

        try {
            const shop: any = await this.shopService.getShops();
            if (shop.length <= 0) return res.status(404).json({
                ok: false,
                resp: 404,
                msg: 'No se encontraron Tiendas para mostrar.',
                shop
            });
            return res.status(200).json({
                ok: true, 
                resp: 200, 
                msg: 'Se han obtenido éxitosamente las Tiendas.', 
                cont: {
                    shop
                }
            });
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

    @Get('/idShop')
    async getShop(@Res() res, @Query('shopID') shopID) {
        // console.log('Shop');
        try {
            const shop = await this.shopService.getShop(shopID);
            if (!shop) return res.status(404).json({
                ok: false,
                resp: 404,
                msg: 'No se encontraron Tiendas para mostrar.',
                shop
            });
            return res.status(200).json({
                ok: true, 
                resp: 200, 
                msg: 'Se han obtenido éxitosamente la Tienda.', 
                cont: {
                    shop
                }
            });
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

    @Delete('/')
    async deleteShop(@Res() res, @Query('shopID') shopID, @Query('blnActive') blnActive) {

        try {
            if (!shopID || shopID.length < 24) {
                return res.status(400).json({
                    ok: false,
                    resp: 400,
                    msg: 'No se recibió un identificador válido.',
                    cont: {
                        shopID
                    }
                });
            }
    
            if (blnActive != 'false' && blnActive != 'true') {
                return res.status(400).json({
                    ok: false,
                    resp: 400,
                    msg: 'No se recibió un valor booleano en el parámetro blnActive',
                    cont: {
                        blnActive: !!blnActive
                    }
                });
            }
            const produc = await this.shopService.deleteShop(shopID, blnActive)
    
           if (!produc) {
            return res.status(404).json({
                ok: false,
                resp: 404,
                msg: `No se encontró Tienda para ${blnActive==='true'? 'activar': 'desactivar'}.`,
                cont: {
                    produc
                }
            });
           }
    
           return res.status(200).json({
            ok: true,
            resp: 200,
            msg: `Se ha ${blnActive==='true'? 'activar': 'desactivar'} la recibir Tienda  exitosamente.`,
            cont: {
                produc
    
            }
        });  
        } catch (err) {
            return res.status(500).json({
                ok: false,
                resp: 500,
                msg: `Error al intentar ${blnActive==='true'? 'activar': 'desactivar'} la Tienda.`,
                cont: {
                    err: Object.keys(err).length === 0 ? err.message : err
                }
            });
        }
    }

    @Put('/') 
    async updateShop(@Res() res, @Body() shopDTO: ShopDTO, @Query('shopID') shopID){

        try {
            console.log('actualiza');
           const shop =  await this.shopService.updateShop(shopID, shopDTO);
           if (!shop) {
            return res.status(404).json({
                ok: false,
                resp: 404,
                msg: `No se encontró Tienda para actualizar`,
                cont: {
                    shop
                }
            });
           }

           return res.status(200).json({
            ok: true, 
            resp: 200, 
            msg: 'Se ha actualizado la Tienda éxitosamente.', 
            cont: {
                shop
            }
        });
        } catch (err) {
            // console.log(err);
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
