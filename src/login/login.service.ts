import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interfaces/login';
import { UserDTO } from './dto/login.dto';
@Injectable()
export class LoginService {
    constructor(@InjectModel('User') private loginModule: Model<UserInterface>){}

    async register(userDTO: UserDTO){
        const respRegister: any = await new this.loginModule(userDTO);
        console.log(respRegister);
        return await respRegister.save();
    }
    async getFoundPerson(strEmail: string): Promise<UserInterface> {
        const found: any  = await this.loginModule.findOne({strEmail: strEmail});
        return await found;
           
    }


}
