import { Module } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registries } from './entities/registries.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Machine } from 'src/modules/machines/entities/machine.entity';
import { Factory } from 'src/modules/factories/entities/factory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Registries, User, Machine, Factory])],
  exports: [RegistriesService],
  providers: [RegistriesService],
})
export class RegistriesModule {}
