import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/login.schema';
import { LoginService } from './login.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1d'
      }
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema}
    ])
  ],
  controllers: [LoginController],
   providers: [LoginService]
})
export class LoginModule {}
