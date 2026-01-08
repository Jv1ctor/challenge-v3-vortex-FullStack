import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule, JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>("JWT_SECRET")
    })
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
