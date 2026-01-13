import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachineDto } from './dtos/machine.dto';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machineService: MachinesService) {}

  @Get()
  async getAllMachines(): Promise<{ machines: MachineDto[] }> {
    return { machines: await this.machineService.getAllMachines() };
  }

  @Get(':id')
  async getMachineById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MachineDto> {
    return this.machineService.getMachine(id);
  }
}
