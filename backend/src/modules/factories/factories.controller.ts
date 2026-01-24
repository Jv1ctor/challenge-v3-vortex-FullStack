import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { FactoriesService } from './factories.service';
import { ZodValidation } from 'src/common/decorators/zod-validation.decorator';
import {
  type CreateFactoryReqDto,
  CreateFactoryReqSchema,
} from './dtos/create-factory-req.dto';
import {
  type AddUserFactoryReqDto,
  AddUserFactoryReqSchema,
} from './dtos/add-user-factory-req-dto';
import { CreateFactoryResDto } from './dtos/create-factory-res.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { FactoriesMinDto } from './dtos/factories-min.dto';
import {
  type CreateMachineReqDto,
  CreateMachineReqSchema,
} from './dtos/create-machine-req.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { FactoryAccess } from 'src/common/decorators/factory-access.decorator';
import { PlatformSelect } from 'src/common/decorators/platform.decorator';
import { Platform } from 'src/common/enums/platform.enum';
import { GetFactoryInfoDto } from './dtos/get-factory-info.dto';
import {
  type UpdateFactoryDto,
  UpdateFactorySchema,
} from './dtos/update-factory.dto';
import {
  type UpdatedMachineDto,
  UpdatedMachineSchema,
} from './dtos/update-machine.dto';
import {
  RegisterUserFactorySchema,
  type RegisUserFactoryDto,
} from './dtos/register-user-factory-req.dto';

@Controller('factories')
export class FactoriesController {
  constructor(private readonly factoryService: FactoriesService) {}

  @Post()
  @ZodValidation(CreateFactoryReqSchema)
  @HttpCode(201)
  @Roles(Role.Admin)
  @PlatformSelect(Platform.Web)
  async createFactory(
    @Body() body: CreateFactoryReqDto,
  ): Promise<CreateFactoryResDto> {
    return await this.factoryService.createFactory(
      body.name,
      body.address,
      body.city,
      body.country,
    );
  }

  @Get(':id')
  async getFactoryInfo(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetFactoryInfoDto> {
    const result = await this.factoryService.getFactoryInfo(id);

    return {
      id: result.id,
      name: result.name,
      address: result.address,
      city: result.city,
      country: result.country,
    };
  }

  @Put(':id')
  @Roles(Role.Admin)
  @HttpCode(204)
  async updateFactory(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(UpdateFactorySchema)) body: UpdateFactoryDto,
  ) {
    await this.factoryService.updateFactory(id, body);
  }

  @Patch(':id/user')
  @HttpCode(202)
  @PlatformSelect(Platform.Web)
  @Roles(Role.Manager, Role.Admin)
  async addUserInFactory(
    @Param('id', ParseIntPipe) factoryId: number,
    @Body(new ZodValidationPipe(AddUserFactoryReqSchema))
    body: AddUserFactoryReqDto,
  ) {
    await this.factoryService.addUserInFactory(factoryId, body.user_id);
  }

  @Post(':id/user')
  @HttpCode(201)
  @PlatformSelect(Platform.Web)
  @Roles(Role.Manager, Role.Admin)
  async createUserInFactory(
    @Param('id', ParseIntPipe) factoryId: number,
    @Body(new ZodValidationPipe(RegisterUserFactorySchema))
    body: RegisUserFactoryDto,
  ) {
    await this.factoryService.registerUserInFactory(
      factoryId,
      body.username,
      body.password,
    );
  }

  @Get()
  @PlatformSelect(Platform.Web)
  @Roles(Role.Admin, Role.Manager)
  async getAllFactoriesMin(): Promise<{ data: FactoriesMinDto[] }> {
    return {
      data: await this.factoryService.getAllFactories(),
    };
  }

  @Get(':id/user')
  @Roles(Role.Admin, Role.Manager)
  @PlatformSelect(Platform.Web)
  async getAllUsersByFactory(@Param('id', ParseIntPipe) factoryId: number) {
    const factory = await this.factoryService.getFactoryInfo(factoryId);
    return {
      id: factory.id,
      name: factory.name,
      created_at: factory,
      data: await this.factoryService.getAllUserByFactory(factoryId),
    };
  }

  @Get(':id/machines')
  @FactoryAccess()
  async getAllMachinesByFactory(@Param('id', ParseIntPipe) factoryId: number) {
    const factory = await this.factoryService.getFactoryInfo(factoryId);
    return {
      id: factory.id,
      name: factory.name,
      created_at: factory.createdAt,
      data: await this.factoryService.getAllMachinesByFactory(factoryId),
    };
  }

  @Post(':id/machines')
  @HttpCode(201)
  @Roles(Role.Admin, Role.Manager)
  @PlatformSelect(Platform.Web)
  async createMachine(
    @Param('id', ParseIntPipe) factoryId: number,
    @Body(new ZodValidationPipe(CreateMachineReqSchema))
    body: CreateMachineReqDto,
  ) {
    await this.factoryService.insertMachine(factoryId, body);
  }

  @Put(':factoryId/machines/:machineId')
  @Roles(Role.Admin)
  @HttpCode(204)
  async updateMachine(
    @Param('factoryId', ParseIntPipe) factoryId: number,
    @Param('machineId', ParseIntPipe) machineId: number,
    @Body(new ZodValidationPipe(UpdatedMachineSchema)) body: UpdatedMachineDto,
  ) {
    await this.factoryService.updateMachine(factoryId, machineId, body);
  }
}
