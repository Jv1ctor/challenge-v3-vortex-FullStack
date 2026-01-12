import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Registries } from 'src/registries/entities/registries.entity';
import { Repository } from 'typeorm';
import { GetKwhByMonthDto } from '../dtos/get-kwh-by-month.dto';
import { GetKwhByMachinesDto } from '../dtos/get-kwh-by-machines.dto';
import { GetKwhByFactoriesDto } from '../dtos/get-kwh-by-factories.dto';

@Injectable()
export class ConsumptionRepository {
  constructor(
    @InjectRepository(Registries)
    private readonly consumptionRepository: Repository<Registries>,
  ) {}

  async getKwhByMonth(): Promise<GetKwhByMonthDto[]> {
    const result = await this.consumptionRepository
      .createQueryBuilder('reg')
      .select("DATE_TRUNC('month', reg.created_at)", 'month')
      .addSelect('SUM(reg.value)', 'total_kwh')
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany<GetKwhByMonthDto>();

    const data: GetKwhByMonthDto[] = result.map((r) => ({
      month: new Date(r.month),
      total_kwh: Number(r.total_kwh),
    }));

    return data;
  }

  async getkwhByMachine(): Promise<GetKwhByMachinesDto[]> {
    const result = await this.consumptionRepository
      .createQueryBuilder('reg')
      .select('SUM(reg.value)::float', 'total_kwh')
      .addSelect('m.id', 'machine_id')
      .addSelect('m.name', 'machine_name')
      .addSelect('m.model', 'machine_model')
      .addSelect('m.manufacturer', 'machine_manufacturer')
      .leftJoin('reg.machine', 'm')
      .groupBy('m.id')
      .addGroupBy('m.name')
      .addGroupBy('m.model')
      .addGroupBy('m.manufacturer')
      .getRawMany<GetKwhByMachinesDto>();

    const data: GetKwhByMachinesDto[] = result.map((r) => ({
      machine_id: Number(r.machine_id),
      machine_name: r.machine_name,
      machine_model: r.machine_model,
      machine_manufacturer: r.machine_manufacturer,
      total_kwh: Number(r.total_kwh),
    }));

    return data;
  }

  async getkwhByFactory(): Promise<GetKwhByFactoriesDto[]> {
    const result = await this.consumptionRepository
      .createQueryBuilder('reg')
      .select('SUM(reg.value)::float', 'total_kwh')
      .addSelect('f.id', 'factory_id')
      .addSelect('f.name', 'factory_name')
      .leftJoin('reg.machine', 'm')
      .leftJoin('m.factory', 'f')
      .groupBy('f.id')
      .addGroupBy('f.name')
      .orderBy('f.id')
      .getRawMany<GetKwhByFactoriesDto>();

    const data: GetKwhByFactoriesDto[] = result.map((r) => ({
      factory_id: Number(r.factory_id),
      factory_name: r.factory_name,
      total_kwh: Number(r.total_kwh)
    }))

    return data
  }
}
