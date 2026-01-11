import { Module } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registries } from './entities/registries.entity';
import { User } from 'src/users/entities/user.entity';
import { Machine } from 'src/machines/entities/machine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Registries, User, Machine])],
  exports: [RegistriesService],
  providers: [RegistriesService],
})
export class RegistriesModule {}
