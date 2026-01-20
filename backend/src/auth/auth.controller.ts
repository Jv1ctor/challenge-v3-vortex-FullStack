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
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  private async login(
    body: SignInRequestDto,
    platform: Platform,
  ): Promise<SignInResponseDto> {
    const { id, access_token } = await this.authService.signIn(
      body.username,
      body.password,
      platform,
    );

    const result = await this.usersService.getOneByIdWithFactory(id);

    return {
      access_token,
      id: id,
      facotyId: result.factory?.id ?? null,
      isAdmin: result.isAdmin,
      name: result.name,
    };
  }

  @Public()
  @Post('web/login')
  @HttpCode(200)
  @ZodValidation(SignInRequestSchema)
  async loginWeb(@Body() body: SignInRequestDto): Promise<SignInResponseDto> {
    return this.login(body, Platform.Web);
  }

  @Public()
  @Post('mobile/login')
  @HttpCode(200)
  @ZodValidation(SignInRequestSchema)
  async loginMobile(
    @Body() body: SignInRequestDto,
  ): Promise<SignInResponseDto> {
    return this.login(body, Platform.Mobile);
  }
}
