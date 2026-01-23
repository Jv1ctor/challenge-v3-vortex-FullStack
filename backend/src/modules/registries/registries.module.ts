import { Module } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registries } from './entities/registries.entity';
import { Machine } from 'src/modules/machines/entities/machine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Registries, Machine])],
  exports: [RegistriesService],
  providers: [RegistriesService],
})
export class RegistriesModule {}
