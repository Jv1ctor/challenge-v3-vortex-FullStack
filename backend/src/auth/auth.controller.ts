import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInRequestSchema,
  type SignInRequestDto,
} from './dtos/sign-in-request.dto';
import { ZodValidation } from 'src/common/decorators/zod-validation.decorator';
import { SignInResponseDto } from './dtos/sign-in-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ZodValidation(SignInRequestSchema)
  async login(@Body() body: SignInRequestDto): Promise<SignInResponseDto> {
    return await this.authService.signIn(body.username, body.password);
  }
}
