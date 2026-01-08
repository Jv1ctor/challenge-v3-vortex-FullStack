import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { type CreateUserOperatorDto, CreateUserOperatorSchema } from './dtos/create-user-operator.dto';
import { ZodValidation } from 'src/common/decorators/zod-validation.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService){}

  @Post("operator")
  @HttpCode(201)
  @ZodValidation(CreateUserOperatorSchema)
  async createOperator(@Body() body: CreateUserOperatorDto){
    await this.usersService.createUserOperator(body.username, body.password)
  }
}