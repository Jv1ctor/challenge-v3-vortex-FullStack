import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { ConsumptionRepository } from './repositories/consumption.repository';
import { Registries } from 'src/registries/entities/registries.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Registries])],
  controllers: [DashboardController],
  providers: [DashboardService, ConsumptionRepository]
})
export class DashboardModule {}
