import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Registries } from 'src/registries/entities/registries.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConsumptionRepository {
  constructor(
    @InjectRepository(Registries)
    private readonly consumptionRepository: Repository<Registries>,
  ) {}
}
