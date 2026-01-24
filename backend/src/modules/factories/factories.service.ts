import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { ErrorMessage } from 'src/common/enums/error-message.enum';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

@Injectable()
export class FactoriesService {
  constructor(
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
    private readonly configService: ConfigService,
  ) {}

  async createFactory(
    name: string,
    address?: string,
    city?: string,
    country?: string,
  ): Promise<CreateFactoryResDto> {
    const existFactory = await this.factoryRepository.findOneBy({ name });

    if (existFactory)
      throw new ConflictException(ErrorMessage.FACTORY_ALREADY_REGISTERED);

    const result = await this.factoryRepository.insert({
      name,
      address,
      city,
      country,
    });
    return {
      id: result.generatedMaps[0].id as number,
    };
  }

  async getFactoryInfo(factoryId: number) {
    const factory = await this.factoryRepository.findOneBy({ id: factoryId });

    if (!factory) throw new NotFoundException(ErrorMessage.FACTORY_NOT_FOUND);

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
      throw new ConflictException(ErrorMessage.FACTORY_NAME_ALREADY_USED);

    await this.factoryRepository.update({ id: factoryId }, { ...factory });
  }

  async addUserInFactory(factoryId: number, userId: string) {
    const factory = await this.factoryRepository.findOneBy({ id: factoryId });

    if (!factory) throw new NotFoundException(ErrorMessage.FACTORY_NOT_FOUND);

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: { factory: true },
    });

    if (!user) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    if (user.factory !== null && user.factory.id)
      throw new ConflictException(
        ErrorMessage.USER_ALREADY_ASSIGNED_TO_FACTORY,
      );

    await this.userRepository.update(
      { id: userId },
      { factory: { id: factoryId } },
    );
  }

  async registerUserInFactory(
    factoryId: number,
    username: string,
    password: string,
  ) {
    const factory = await this.factoryRepository.findOneBy({ id: factoryId });

    if (!factory) throw new NotFoundException(ErrorMessage.FACTORY_NOT_FOUND);

    const existUser = await this.userRepository.findOne({
      where: {
        name: username,
      },
      relations: { factory: true },
    });

    if (existUser)
      throw new ConflictException(ErrorMessage.USERNAME_ALREADY_EXISTS);

    const saltRounds = Number(
      this.configService.get<number>('BCRYPT_SALT_ROUNDS', 10),
    );
    const hashedPass = await bcrypt.hash(password, saltRounds);

    await this.userRepository.insert({
      name: username,
      password: hashedPass,
      factory: { id: factoryId },
    });
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
      .leftJoin('registries', 'r', ' r.user_id = users.id')
      .leftJoin('machines', 'm', 'm.id = r.machine_id')
      .select(['users.id AS id', 'users.name AS name'])
      .addSelect('COUNT(r.id)::int', 'total_registries')
      .addSelect(
        'MAX(r.created_at) FILTER (WHERE r.id IS NOT NULL)',
        'last_registry_at',
      )
      .where('users.factory_id = :factoryId', { factoryId })
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

    if (!factory) throw new NotFoundException(ErrorMessage.FACTORY_NOT_FOUND);

    const existMachine = await this.machineRepository.findOneBy({
      name: machine.name,
    });

    if (existMachine)
      throw new ConflictException(ErrorMessage.MACHINE_NAME_ALREADY_EXISTS);

    await this.machineRepository.insert({
      ...machine,
      factory: { id: factoryId },
    });
  }

  async updateMachine(
    factoryId: number,
    machineId: number,
    machine: UpdatedMachineDto,
  ) {
    const existMachine = await this.machineRepository.findOneBy({
      name: machine.name,
    });

    if (existMachine)
      throw new ConflictException(ErrorMessage.MACHINE_NAME_ALREADY_EXISTS);

    const existMachineInFactory = await this.machineRepository.findOne({
      where: {
        factory: { id: factoryId },
        id: machineId,
      },
    });

    if (!existMachineInFactory) {
      throw new NotFoundException(ErrorMessage.MACHINE_NOT_FOUND_IN_FACTORY);
    }

    await this.machineRepository.update({ id: machineId }, { ...machine });
  }
}
