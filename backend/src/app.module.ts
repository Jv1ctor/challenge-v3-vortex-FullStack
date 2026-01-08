import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    RouterModule.register([
      { path: "api" }
    ]),
    UsersModule,
    AuthModule
  ],
  controllers: [AuthController],
})
export class AppModule {}
