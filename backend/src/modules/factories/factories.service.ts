import { BadRequestException, Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { Factory } from './entities/factory.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFactoryResDto } from './dtos/create-factory-res.dto';
import { FactoriesMinDto } from './dtos/factories-min.dto';
import { UsersByFactoryDto } from './dtos/users-by-factory.dto';
import { Machine } from 'src/modules/machines/entities/machine.entity';
import { GetMachinesByFactoryDto } from './dtos/get-machines-by-factory.dto';
import { UpdateFactoryDto } from './dtos/update-factory.dto';
import { UpdatedMachineDto } from './dtos/update-machine.dto';

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

  async createFactory(
    name: string,
    address?: string,
    city?: string,
    country?: string,
  ): Promise<CreateFactoryResDto> {
    const existFactory = await this.factoryRepository.findOneBy({ name });

    if (existFactory) throw new BadRequestException('already exist factory');

    const result = await this.factoryRepository.insert({
      name,
      address,
      city,
      country,
    });
    return {
      id: result.generatedMaps[0].id,
    };
  }

  async getFactoryInfo(factoryId: number) {
    const factory = await this.factoryRepository.findOneBy({ id: factoryId });

    if (!factory) throw new BadRequestException('not found factory');

    return factory;
  }

  async updateFactory(factoryId: number, factory: UpdateFactoryDto) {
    const existNameFactory = await this.factoryRepository.find({
      where: {
        name: factory.name,
        id: Not(factoryId),
      },
    });

    if (existNameFactory.length > 0)
      throw new BadRequestException(`"${factory.name}" already used`);

    await this.factoryRepository.update({ id: factoryId }, { ...factory });
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
    const factories = await this.factoryRepository.find({
      select: {
        id: true,
        name: true,
        city: true,
        address: true,
        country: true,
      },
      relations: {
        users: true,
        machines: true,
      },
    });

    return factories.map((i) => ({
      id: i.id,
      name: i.name,
      address: i.address,
      city: i.city,
      country: i.country,
      count_machines: i.machines.length,
      count_users: i.users.length,
    }));
  }

  async getAllUserByFactory(factoryId: number): Promise<UsersByFactoryDto[]> {
    return await this.userRepository
      .createQueryBuilder('users')
      .innerJoin('registries', 'r', ' r.user_id = users.id')
      .innerJoin('machines', 'm', 'm.id = r.machine_id')
      .select(['users.id AS id', 'users.name AS name'])
      .addSelect('COUNT(r.id)::int', 'total_registries')
      .addSelect('MAX(r.created_at)', 'last_registry_at')
      .where('m.factory_id = :factoryId', { factoryId })
      .groupBy('users.id')
      .addGroupBy('users.name')
      .getRawMany<UsersByFactoryDto>();
  }

  async getAllMachinesByFactory(
    factoryId: number,
  ): Promise<GetMachinesByFactoryDto[]> {
    return await this.machineRepository
      .createQueryBuilder('machine')
      .leftJoin('machine.registries', 'registry')
      .select([
        'machine.id AS id',
        'machine.name AS name',
        'machine.model AS model',
        'machine.manufacturer AS manufacturer',
        'machine.description AS description',
        'machine.created_at',
        'machine.updated_at',
      ])
      .addSelect('COUNT(registry.id)::int', 'total_registries')
      .addSelect('COALESCE(SUM(registry.value), 0)::float', 'total_value')
      .addSelect('MAX(registry.created_at)', 'last_registry_at')
      .where('machine.factory_id = :factoryId', { factoryId })
      .groupBy('machine.id')
      .addGroupBy('machine.name')
      .addGroupBy('machine.model')
      .addGroupBy('machine.manufacturer')
      .addGroupBy('machine.description')
      .addGroupBy('machine.created_at')
      .addGroupBy('machine.updated_at')
      .getRawMany<GetMachinesByFactoryDto>();
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

  async updateMachine(
    factoryId: number, // 2
    machineId: number, // 1
    machine: UpdatedMachineDto,
  ) {
    const existMachine = await this.machineRepository.find({
      where: {
        factory: {
          id: factoryId,
        },
        id: Not(machineId),
        name: machine.name,
      },
      relations: {
        factory: true,
      },
    });

    const existMachineInFactory = await this.machineRepository.findOne({
      where: {
        factory: { id: factoryId },
        id: machineId,
      },
    });

    if (!existMachineInFactory) {
      throw new BadRequestException(`not found this machine in factory`);
    }

    if (existMachine.length > 0)
      throw new BadRequestException(
        `"${machine.name}" already used in "${existMachine[0].factory.name}"`,
      );

    await this.machineRepository.update({ id: machineId }, { ...machine });
  }
}
