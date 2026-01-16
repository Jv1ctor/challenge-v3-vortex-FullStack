import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachineDto } from './dtos/machine.dto';
import { RegistriesByMachineDto } from './dtos/registries-by-machine.dto';
import { RegistriesService } from 'src/registries/registries.service';
import {
  type InsertRegistriesByMachineDto,
  InsertRegistriesByMachineSchema,
} from './dtos/insert-registries-machine-req.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('machines')
export class MachinesController {
  constructor(
    private readonly machineService: MachinesService,
    private readonly registriesService: RegistriesService,
  ) {}

  @Get()
  async getAllMachines(): Promise<{ data: MachineDto[] }> {
    return { data: await this.machineService.getAllMachines() };
  }

  @Get(':id')
  async getMachineById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MachineDto> {
    return this.machineService.getMachine(id);
  }

  @Get(':id/registries')
  async getAllRegistriesByMachine(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: RegistriesByMachineDto[] }> {
    return {
      data: await this.registriesService.getAllRegistriesByMachine(id),
    };
  }

  @Post(':id/registries')
  @HttpCode(201)
  async insertRegistries(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(InsertRegistriesByMachineSchema))
    body: InsertRegistriesByMachineDto,
  ) {
    await this.registriesService.insertRegistry(id, body.user_id, body.value);
  }
}
