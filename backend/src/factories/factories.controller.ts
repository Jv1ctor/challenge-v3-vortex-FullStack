import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { FactoriesService } from './factories.service';
import { ZodValidation } from 'src/common/decorators/zod-validation.decorator';
import {
  type CreateFactoryReqDto,
  CreateFactoryReqSchema,
} from './dtos/create-factory-req.dto';
import {
  type RegisterUserReqDto,
  RegisterUserReqSchema,
} from './dtos/register-user-req-dto';
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

  @Patch(':id/user')
  @HttpCode(202)
  @PlatformSelect(Platform.Web)
  @Roles(Role.Manager, Role.Admin)
  async registerUsers(
    @Param('id', ParseIntPipe) factoryId: number,
    @Body(new ZodValidationPipe(RegisterUserReqSchema))
    body: RegisterUserReqDto,
  ) {
    await this.factoryService.registerUser(factoryId, body.user_id);
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
      created_at: factory.createdAt,
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
}
