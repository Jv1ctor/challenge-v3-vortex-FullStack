import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Factory } from './entities/factory.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFactoryResDto } from './dtos/create-factory-res.dto';
import { FactoriesMinDto } from './dtos/factories-min.dto';
import { UsersByFactoryDto } from './dtos/users-by-factory.dto';
import { Machine } from 'src/machines/entities/machine.entity';
import { GetMachinesByFactoryDto } from './dtos/get-machines-by-factory.dto';

@Injectable()
export class FactoriesService {
  constructor(
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
  ) {}

  async createFactory(name: string): Promise<CreateFactoryResDto> {
    const existFactory = await this.factoryRepository.findOneBy({ name });

    if (existFactory) throw new BadRequestException('already exist factory');

    const result = await this.factoryRepository.insert({ name });
    return {
      id: result.generatedMaps[0].id,
    };
  }

  async registerUser(factoryId: number, userId: string) {
    const factory = await this.factoryRepository.findOneBy({ id: factoryId });

    if (!factory) throw new BadRequestException('not found factory');

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: { factory: true },
    });

    if (!user) throw new BadRequestException('not found user');

    if (user.factory !== null && user.factory.id)
      throw new BadRequestException('already registed factory');

    await this.userRepository.update(
      { id: userId },
      { factory: { id: factoryId } },
    );
  }

  async getAllFactories(): Promise<FactoriesMinDto[]> {
    return await this.factoryRepository.find({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getAllUserByFactory(factoryId: number): Promise<UsersByFactoryDto[]> {
    return await this.userRepository.find({
      select: { name: true },
      where: { factory: { id: factoryId } },
    });
  }

  async getAllMachinesByFactory(
    factoryId: number,
  ): Promise<GetMachinesByFactoryDto[]> {
    return await this.machineRepository.find({
      where: {
        factory: {
          id: factoryId,
        },
      },
      select: {
        id: true,
        name: true,
        model: true,
        manufacturer: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async insertMachine(
    factoryId: number,
    machine: {
      name: string;
      model?: string;
      manufacture?: string;
      description?: string;
    },
  ) {
    const factory = await this.factoryRepository.findOneBy({ id: factoryId });

    if (!factory) throw new BadRequestException('not found factory');

    const existMachine = await this.machineRepository.findOneBy({
      name: machine.name,
    });

    if (existMachine)
      throw new BadRequestException('already exist machine name');

    await this.machineRepository.insert({
      ...machine,
      factory: { id: factoryId },
    });
  }
}
