import { Module } from '@nestjs/common';
import { FactoriesController } from './factories.controller';
import { FactoriesService } from './factories.service';
import { Factory } from './entities/factory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Factory])],
  controllers: [FactoriesController],
  providers: [FactoriesService],
})
export class FactoriesModule {}
