import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Req,
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
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { FactoryAccess } from 'src/common/decorators/factory-access.decorator';
import { type Request } from 'express';
import { Platform } from 'src/common/enums/platform.enum';
import { PlatformSelect } from 'src/common/decorators/platform.decorator';

@Controller('machines')
export class MachinesController {
  constructor(
    private readonly machineService: MachinesService,
    private readonly registriesService: RegistriesService,
  ) {}

  @Get()
  @PlatformSelect(Platform.Web)
  @Roles(Role.Admin)
  async getAllMachines(): Promise<{ data: MachineDto[] }> {
    return { data: await this.machineService.getAllMachines() };
  }

  @FactoryAccess()
  @Get(':id')
  async getMachineById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MachineDto> {
    return this.machineService.getMachine(id);
  }

  @FactoryAccess()
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
  @Roles(Role.Operator)
  @PlatformSelect(Platform.Mobile)
  @FactoryAccess()
  async insertRegistries(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(InsertRegistriesByMachineSchema))
    body: InsertRegistriesByMachineDto,
    @Req() request: Request,
  ) {
    await this.registriesService.insertRegistry(
      id,
      request.user.id,
      body.value,
    );
  }
}
