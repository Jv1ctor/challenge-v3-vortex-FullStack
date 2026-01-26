import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DbModule } from './modules/db/db.module';
import { FactoriesModule } from './modules/factories/factories.module';
import { MachinesModule } from './modules/machines/machines.module';
import { RegistriesModule } from './modules/registries/registries.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DbModule,
    UsersModule,
    FactoriesModule,
    AuthModule,
    MachinesModule,
    RegistriesModule,
    DashboardModule,
  ],
})
export class AppModule {}
