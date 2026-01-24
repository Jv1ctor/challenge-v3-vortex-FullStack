import { Module } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registries } from './entities/registries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Registries])],
  exports: [RegistriesService],
  providers: [RegistriesService],
})
export class RegistriesModule {}
