import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Registries } from './entities/registries.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorMessage } from 'src/common/enums/error-message.enum';
import { RegistriesDto } from './dtos/registries.dto';

@Injectable()
export class RegistriesService {
  constructor(
    @InjectRepository(Registries)
    private readonly registryRepository: Repository<Registries>,
  ) {}

  async insertRegistry(
    machineId: number,
    factoryId: number,
    userId: string,
    value: number,
  ) {
    await this.registryRepository.insert({
      machine: {
        id: machineId,
      },
      factory: {
        id: factoryId,
      },
      user: {
        id: userId,
      },
      value: value,
    });
  }

  async getAllRegistriesByMachine(machineId: number): Promise<RegistriesDto[]> {
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
      withDeleted: true,
    });
  }

  async updateValueRegistry(registryId: number, value: number) {
    const result = await this.registryRepository.update(
      { id: registryId },
      { value },
    );
    if (result.affected === 0) {
      throw new NotFoundException(ErrorMessage.REGISTRY_NOT_FOUND);
    }
  }
}
