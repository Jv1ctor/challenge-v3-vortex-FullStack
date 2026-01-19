import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInRequestSchema,
  type SignInRequestDto,
} from './dtos/sign-in-request.dto';
import { ZodValidation } from 'src/common/decorators/zod-validation.decorator';
import { SignInResponseDto } from './dtos/sign-in-response.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Platform } from 'src/common/enums/platform.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('web/login')
  @HttpCode(200)
  @ZodValidation(SignInRequestSchema)
  async loginWeb(@Body() body: SignInRequestDto): Promise<SignInResponseDto> {
    return await this.authService.signIn(
      body.username,
      body.password,
      Platform.Web,
    );
  }

  @Public()
  @Post('mobile/login')
  @HttpCode(200)
  @ZodValidation(SignInRequestSchema)
  async loginMobile(
    @Body() body: SignInRequestDto,
  ): Promise<SignInResponseDto> {
    return await this.authService.signIn(
      body.username,
      body.password,
      Platform.Mobile,
    );
  }
}
