import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/role.guard';
import { FactoryAccessGuard } from './guards/factory-accesss.guard';
import { PlatformGuard } from './guards/platform.guard';
import { MachineAccessGuard } from './guards/machine-access.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: FactoryAccessGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PlatformGuard,
    },
    {
      provide: APP_GUARD,
      useClass: MachineAccessGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
