import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  type CreateUserOperatorDto,
  CreateUserOperatorSchema,
} from './dtos/create-user-operator.dto';
import { ZodValidation } from 'src/common/decorators/zod-validation.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { PlatformSelect } from 'src/common/decorators/platform.decorator';
import { Platform } from 'src/common/enums/platform.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('operator')
  @HttpCode(201)
  @Roles(Role.Admin, Role.Manager)
  @PlatformSelect(Platform.Web)
  @ZodValidation(CreateUserOperatorSchema)
  async createOperator(@Body() body: CreateUserOperatorDto) {
    await this.usersService.createUserOperator(body.username, body.password);
  }
}
