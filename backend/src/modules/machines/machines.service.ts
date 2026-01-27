import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { Repository } from 'typeorm';
import { MachineDto } from './dtos/machine.dto';
import { ErrorMessage } from 'src/common/enums/error-message.enum';
import { GetMachinesByFactoryDto } from './dtos/get-machines-by-factory.dto';
import { UpdatedMachineDto } from './dtos/update-machine.dto';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private readonly machinesRepository: Repository<Machine>,
  ) {}

  async getAllMachines(): Promise<MachineDto[]> {
    const machines = await this.machinesRepository.find({
      select: {
        id: true,
        name: true,
        model: true,
        manufacturer: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        factory: {
          id: true,
          name: true,
        },
      },
      relations: { factory: true },
    });

    return machines;
  }

  async getMachine(id: number): Promise<MachineDto> {
    const machine = await this.machinesRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        model: true,
        manufacturer: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        factory: {
          id: true,
          name: true,
        },
      },
      relations: { factory: true },
    });

    if (!machine) throw new NotFoundException(ErrorMessage.MACHINE_NOT_FOUND);

    return machine;
  }

  async getAllMachinesByFactory(
    factoryId: number,
  ): Promise<GetMachinesByFactoryDto[]> {
    return await this.machinesRepository
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
    const existMachine = await this.machinesRepository.findOne({
      where: { name: machine.name },
      relations: { factory: true },
      withDeleted: true,
    });

    if (existMachine && existMachine.deletedAt)
      throw new ConflictException(
        ErrorMessage.MACHINE_ALREADY_EXIST_IN_DELETED_MACHINE,
      );

    if (existMachine)
      throw new ConflictException(ErrorMessage.MACHINE_NAME_ALREADY_EXISTS);

    await this.machinesRepository.insert({
      ...machine,
      factory: { id: factoryId },
    });
  }

  async updateMachine(
    factoryId: number,
    machineId: number,
    machine: UpdatedMachineDto,
  ) {
    const existMachine = await this.machinesRepository.findOne({
      where: { name: machine.name },
      withDeleted: true,
    });

    if (existMachine && existMachine.deletedAt)
      throw new ConflictException(
        ErrorMessage.MACHINE_ALREADY_EXIST_IN_DELETED_MACHINE,
      );

    if (existMachine)
      throw new ConflictException(ErrorMessage.MACHINE_NAME_ALREADY_EXISTS);

    const existMachineInFactory = await this.machinesRepository.findOne({
      where: {
        factory: { id: factoryId },
        id: machineId,
      },
    });

    if (!existMachineInFactory) {
      throw new NotFoundException(ErrorMessage.MACHINE_NOT_FOUND_IN_FACTORY);
    }

    await this.machinesRepository.update({ id: machineId }, { ...machine });
  }

  async belongsFactoryByMachine(
    machineId: number,
    userId: string,
  ): Promise<boolean> {
    const relation = await this.machinesRepository.findOne({
      where: { id: machineId, factory: { users: { id: userId } } },
    });
    return !!relation;
  }

  async disableMachine(machineId: number) {
    const machine = await this.machinesRepository.findOneBy({
      id: machineId,
    });

    if (!machine) {
      throw new NotFoundException(ErrorMessage.MACHINE_NOT_FOUND);
    }

    if (machine.deletedAt) {
      return;
    }

    await this.machinesRepository.softDelete({
      id: machineId,
    });
  }
}
