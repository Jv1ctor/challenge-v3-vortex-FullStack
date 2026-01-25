import { Module } from '@nestjs/common';
import { FactoriesController } from './factories.controller';
import { FactoriesService } from './factories.service';
import { Factory } from './entities/factory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachinesModule } from '../machines/machines.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Factory]), MachinesModule, UsersModule],
  exports: [FactoriesService],
  controllers: [FactoriesController],
  providers: [FactoriesService],
})
export class FactoriesModule {}
