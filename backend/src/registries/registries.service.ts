import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Registries } from './entities/registries.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from 'src/machines/entities/machine.entity';
import { User } from 'src/users/entities/user.entity';
import { RegistriesDto } from './dtos/registries.dto';
import { Factory } from 'src/factories/entities/factory.entity';

@Injectable()
export class RegistriesService {
  constructor(
    @InjectRepository(Registries)
    private readonly registryRepository: Repository<Registries>,
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
  ) {}

  async insertRegistry(machineId: number, userId: string, value: number) {
    const existMachine = await this.machineRepository.findOne({
      where: { id: machineId },
      relations: { factory: true },
    });

    if (!existMachine) throw new BadRequestException('not found machine');

    await this.registryRepository.insert({
      machine: {
        id: machineId,
      },
      user: {
        id: userId,
      },
      value: value,
    });
  }

  async getAllRegistriesByMachine(machineId: number): Promise<RegistriesDto[]> {
    const existMachine = await this.machineRepository.findOneBy({
      id: machineId,
    });

    if (!existMachine) throw new BadRequestException('not found machine');

    return this.registryRepository.find({
      where: {
        machine: {
          id: machineId,
        },
      },

      select: {
        id: true,
        value: true,
        createdAt: true,
        user: {
          id: true,
          name: true,
          isAdmin: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: { user: true },
    });
  }
}
