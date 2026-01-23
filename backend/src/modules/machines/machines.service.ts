import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { Repository } from 'typeorm';
import { MachineDto } from './dtos/machine.dto';
import { ErrorMessage } from 'src/common/enums/error-message.enum';

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
}
