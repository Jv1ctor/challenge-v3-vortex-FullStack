import { Module } from '@nestjs/common';
import { FactoriesController } from './factories.controller';
import { FactoriesService } from './factories.service';
import { Factory } from './entities/factory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Machine } from 'src/modules/machines/entities/machine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Factory, User, Machine])],
  controllers: [FactoriesController],
  providers: [FactoriesService],
})
export class FactoriesModule {}
