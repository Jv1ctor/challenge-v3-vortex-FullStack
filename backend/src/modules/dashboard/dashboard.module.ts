import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { ConsumptionRepository } from './repositories/consumption.repository';
import { Registries } from 'src/modules/registries/entities/registries.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactoriesModule } from '../factories/factories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Registries]), FactoriesModule],
  controllers: [DashboardController],
  providers: [DashboardService, ConsumptionRepository],
})
export class DashboardModule {}
