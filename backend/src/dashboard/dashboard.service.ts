import { Injectable } from '@nestjs/common';
import { ConsumptionRepository } from './repositories/consumption.repository';
import { GetKwhByMonthDto } from './dtos/get-kwh-by-month.dto';
import { GetKwhByMachinesDto } from './dtos/get-kwh-by-machines.dto';
import { GetKwhByFactoriesDto } from './dtos/get-kwh-by-factories.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly consumptionRepository: ConsumptionRepository){}

  async getKwhByMonth(): Promise<GetKwhByMonthDto[]>{
    return await this.consumptionRepository.getKwhByMonth()
  }

  async getKwhByMachines(): Promise<GetKwhByMachinesDto[]>{
    return await this.consumptionRepository.getkwhByMachine()
  }

  async getKwhByFactories(): Promise<GetKwhByFactoriesDto[]>{
    return await this.consumptionRepository.getkwhByFactory()
  }
}
