import { Module } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registries } from './entities/registries.entity';
import { RegistriesController } from './registries.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Registries])],
  exports: [RegistriesService],
  providers: [RegistriesService],
  controllers: [RegistriesController],
})
export class RegistriesModule {}
