import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { FactoriesModule } from './factories/factories.module';
import { MachinesModule } from './machines/machines.module';
import { RegistriesModule } from './registries/registries.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
