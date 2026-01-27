import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Registries } from 'src/modules/registries/entities/registries.entity';
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

  async getKwhMonthByFactoryAndYear(
    factoryId: number,
    year?: number,
  ): Promise<GetKwhByMonthDto[]> {
    const query = this.consumptionRepository
      .createQueryBuilder('reg')
      .select("DATE_TRUNC('month', reg.created_at)", 'month')
      .addSelect('SUM(reg.value)', 'total_kwh')
      .where('reg.factory_id = :factoryId', { factoryId });

    if (year)
      query.andWhere("DATE_PART('year', reg.created_at) = :year", { year });

    const result = await query
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany<GetKwhByMonthDto>();

    const data: GetKwhByMonthDto[] = result.map((r) => ({
      month: new Date(r.month),
      total_kwh: Number(r.total_kwh),
    }));

    return data;
  }

  async getkwhByMachineAll(): Promise<GetKwhByMachinesDto[]> {
    const result = await this.consumptionRepository
      .createQueryBuilder('reg')
      .withDeleted()
      .select('SUM(reg.value)::float', 'total_kwh')
      .addSelect('m.id', 'machine_id')
      .addSelect('m.name', 'machine_name')
      .addSelect('m.model', 'machine_model')
      .addSelect('m.manufacturer', 'machine_manufacturer')
      .addSelect('m.deleted_at IS NULL', 'machine_active')
      .leftJoin(
        'reg.machine',
        'm',
        'm.deleted_at IS NULL OR m.deleted_at IS NOT NULL',
      )
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
      machine_active: r.machine_active,
      total_kwh: Number(r.total_kwh),
    }));

    return data;
  }

  async getkwhByFactoryAll(): Promise<GetKwhByFactoriesDto[]> {
    const result = await this.consumptionRepository
      .createQueryBuilder('reg')
      .withDeleted()
      .select('SUM(reg.value)::float', 'total_kwh')
      .addSelect('f.id', 'factory_id')
      .addSelect('f.name', 'factory_name')
      .addSelect('f.deleted_at IS NULL', 'factory_active')
      .leftJoin('reg.machine', 'm')
      .leftJoin(
        'm.factory',
        'f',
        'f.deleted_at IS NULL OR f.deleted_at IS NOT NULL',
      )
      .groupBy('f.id')
      .addGroupBy('f.name')
      .addGroupBy('f.deleted_at')
      .orderBy('f.id')
      .getRawMany<GetKwhByFactoriesDto>();

    const data: GetKwhByFactoriesDto[] = result.map((r) => ({
      factory_id: Number(r.factory_id),
      factory_name: r.factory_name,
      factory_active: r.factory_active,
      total_kwh: Number(r.total_kwh),
    }));

    return data;
  }
}
