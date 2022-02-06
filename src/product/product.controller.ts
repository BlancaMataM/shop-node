import { Controller,Get, Post, Put, Delete, Res, Req, Body, Param, Query } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
var mongoose = require('mongoose');
@Controller('api/product')
export class ProductController {
    constructor(private productService: ProductService) {

    }
    @Post('/')
    async createPost(@Res() res, @Body() createProducDTO: CreateProductDTO) {
      try {
          const found = await this.productService.getFoundProduct(createProducDTO.strName)
          if (found) {
              return res.status().json({
                ok: false,
                resp: 400,
                msg: `El producto ${found} ya se encuentra registrado.`,
                cont: {
                    found
                }
              })
          }
          const product = await this.productService.createProduct(createProducDTO);
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

    @Get('/')
    async getProducts(@Res() res) {

        try {
            const product: any = await this.productService.getProducts();
            if (product.length <= 0) return res.status(404).json({
                ok: false,
                resp: 404,
                msg: 'No se encontraron productos para mostrar.',
                product
            });
            return res.status(200).json({
                ok: true, 
                resp: 200, 
                msg: 'Se han obtenido éxitosamente los productos.', 
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

    @Get('/idProdut')
    async getProduct(@Res() res, @Query('productID') productID) {
        try {
            const product = await this.productService.getProduct(productID);
            if (!product) return res.status(404).json({
                ok: false,
                resp: 404,
                msg: 'No se encontraron productos para mostrar.',
                product
            });
            return res.status(200).json({
                ok: true, 
                resp: 200, 
                msg: 'Se han obtenido éxitosamente el producto.', 
                cont: {
                    product
                }
            });
        } catch (err) {
            return res.status(500).json({
                ok: false,
                resp: 500,
                msg: 'Error al intentar consultar los productos..',
                cont: {
                    err: Object.keys(err).length === 0 ? err.message : err
                }
            });
        }
              
    }

    @Delete('/')
    async deleteProduct(@Res() res, @Query('productID') productID, @Query('blnActive') blnActive) {

        try {
            if (!productID || productID.length < 24) {
                return res.status(400).json({
                    ok: false,
                    resp: 400,
                    msg: 'No se recibió un identificador válido.',
                    cont: {
                        productID
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
            const produc = await this.productService.deleteProduct(productID, blnActive)
    
           if (!produc) {
            return res.status(404).json({
                ok: false,
                resp: 404,
                msg: `No se encontró producto para ${blnActive==='true'? 'activar': 'desactivar'}.`,
                cont: {
                    produc
                }
            });
           }
    
           return res.status(200).json({
            ok: true,
            resp: 200,
            msg: `Se ha ${blnActive==='true'? 'activar': 'desactivar'} la recibir producto durante el viaje exitosamente.`,
            cont: {
                produc
    
            }
        });  
        } catch (err) {
            return res.status(500).json({
                ok: false,
                resp: 500,
                msg: `Error al intentar ${blnActive==='true'? 'activar': 'desactivar'} el producto.`,
                cont: {
                    err: Object.keys(err).length === 0 ? err.message : err
                }
            });
        }
    }

    @Put('/') 
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID){

        try {
           const product =  await this.productService.updatePoduct(productID, createProductDTO);
           if (!product) {
            return res.status(404).json({
                ok: false,
                resp: 404,
                msg: `No se encontró producto para actualizarlo`,
                cont: {
                    product
                }
            });
           }

           return res.status(200).json({
            ok: true, 
            resp: 200, 
            msg: 'Se ha actualizado el producto éxitosamente.', 
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


}
