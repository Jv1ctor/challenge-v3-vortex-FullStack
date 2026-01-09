import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [UsersModule, JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>("JWT_SECRET")
    }),
    inject: [ConfigService],
  })],
  providers: [AuthService, { 
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  controllers: [AuthController]
})
export class AuthModule {}
