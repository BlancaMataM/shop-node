import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { LoginService } from './login.service';
import { JwtService } from '@nestjs/jwt';

@Controller('api/login')
export class LoginController {

    constructor(private loginService: LoginService, private jwtService: JwtService) {}
    
    @Get()
    getUsers() {

    }
    @Post('/register')
    async register(@Res() res, @Body() userDTO: UserDTO){
        try {
            if (userDTO.strPassword) {
                userDTO.strPassword = bcrypt.hashSync(userDTO.strPassword, 12);
            }

            const fount = await this.loginService.getFoundPerson(userDTO.strEmail);
            if (fount) {
                return res.status(400).json({
                    ok: false,
                    resp: 400,
                    msg: "El correo del usuario que desea registrar ya se encuentra en uso.",
                    cont: {
                        strEmail: userDTO.strEmail,
                    },
                });
            }
            const user = await this.loginService.register(userDTO);
            if (!user) {
                return res.status(404).json({
                    ok: false, 
                    resp: 404, 
                    msg: 'A ocurrido un error al momento de registrar a la persona',
                    cont:{
                        user
                    }
                });
            }
            return res.status(200).json({
                ok: true, 
                resp: 200, 
                msg: 'Se ha registrado el usuario éxitosamente en la base de datos', 
                cont: {
                    user
                }
            });
        } catch (err) {
            return res.status(500).json({
                ok: false,
                resp: 500,
                msg: 'Error al registrar la persona.',
                cont: {
                    err: Object.keys(err).length === 0 ? err.message : err
                }
            });
        }
    }
    // @Res({passthrough: true}) response

    @Post('/login')
    async login(@Res() res, @Res({passthrough: true}) response,  @Body() userDTO: UserDTO) {

        try {
            const user = await this.loginService.getFoundPerson(userDTO.strEmail);

            if (!user) {
                return res.status(404).json({
                    ok: false, 
                    resp: 404, 
                    msg: 'El correo y/o contraseña son incorrectos',
                    cont:{
                        user
                    }
                });
            }

            if (!bcrypt.compare(userDTO.strPassword, user.strPassword)) {
                return res.status(404).json({
                    ok: false, 
                    resp: 404, 
                    msg: 'El correo y/o contraseña son incorrectos',
                    cont:{
                        user
                    }
                });
            }

            const jwt: any = await this.jwtService.signAsync({id: user._id});
            // await response.cookie('jwt', jwt, {httpOnly: true});
            return res.status(200).json({
                ok: true, 
                resp: 200, 
                msg: 'Se ha logueado exitósamente', 
                cont: {
                    jwt
                }
            });
        } catch (err) {
            return res.status(500).json({
                ok: false,
                resp: 500,
                msg: 'Error al registrar la persona.',
                cont: {
                    err: Object.keys(err).length === 0 ? err.message : err
                }
            });
        }
    }

    // @Get('user')
    // async user(@Req() req: Request){
    //    const cookie =  req.cookies['jwt'];
    // }
}
