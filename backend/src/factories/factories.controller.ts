import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FactoriesService } from './factories.service';
import { ZodValidation } from 'src/common/decorators/zod-validation.decorator';
import {
  type CreateFactoryReqDto,
  CreateFactoryReqSchema,
} from './dtos/create-factory-req-dto';
import { type RegisterUserReqDto, RegisterUserReqSchema } from './dtos/register-user-req-dto';
import { CreateFactoryResDto } from './dtos/create-factory-res-dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('factories')
export class FactoriesController {
  constructor(private readonly factoryService: FactoriesService) {}

  @Post()
  @ZodValidation(CreateFactoryReqSchema)
  @HttpCode(201)
  async createFactory(
    @Body() body: CreateFactoryReqDto,
  ): Promise<CreateFactoryResDto> {
    return await this.factoryService.createFactory(body.name);
  }

  @Patch(':id/user')
  @HttpCode(202)
  async registerUsers(
    @Param('id', ParseIntPipe) factoryId: number,
    @Body(new ZodValidationPipe(RegisterUserReqSchema)) body: RegisterUserReqDto,
  ) {
    await this.factoryService.registerUser(factoryId, body.user_id);
  }
}
