import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Registries } from './entities/registries.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from 'src/modules/machines/entities/machine.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { RegistriesDto } from './dtos/registries.dto';
import { Factory } from 'src/modules/factories/entities/factory.entity';
import { ErrorMessage } from 'src/common/enums/error-message.enum';

@Injectable()
export class RegistriesService {
  constructor(
    @InjectRepository(Registries)
    private readonly registryRepository: Repository<Registries>,
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
  ) {}

  async insertRegistry(machineId: number, userId: string, value: number) {
    const existMachine = await this.machineRepository.findOne({
      where: { id: machineId },
      relations: { factory: true },
    });

    if (!existMachine)
      throw new NotFoundException(ErrorMessage.MACHINE_NOT_FOUND);

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

    if (!existMachine)
      throw new NotFoundException(ErrorMessage.MACHINE_NOT_FOUND);

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
