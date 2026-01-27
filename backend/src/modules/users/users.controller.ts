import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
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
import { type Request } from 'express';
import {
  type UpdatePasswordDto,
  UpdatePasswordSchema,
} from './dtos/update-password-operator.dto';

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

  @Get('operator/')
  @Roles(Role.Operator)
  async getOperatorInfo(@Req() request: Request) {
    return await this.usersService.getOperatorInfo(request.user.id);
  }

  @Patch('operator/')
  @Roles(Role.Admin, Role.Manager)
  @ZodValidation(UpdatePasswordSchema)
  async updatePassword(@Body() body: UpdatePasswordDto) {
    return await this.usersService.updatePasswordUser(
      body.user_id,
      body.password,
    );
  }

  @Delete('operator/:id')
  @HttpCode(202)
  @Roles(Role.Admin, Role.Manager)
  async disableOperator(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.disableUser(id);
  }
}
