import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInResponseDto } from './dtos/sign-in-response.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/role.enum';
import { Platform } from 'src/common/enums/platform.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
    platform: Platform,
  ): Promise<SignInResponseDto> {
    const user = await this.usersService.getOneByName(username);

    if (!user) throw new UnauthorizedException();

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) throw new UnauthorizedException();

    const roles: string[] = [];

    if (user.isAdmin) {
      roles.push(Role.Admin);
    } else {
      roles.push(Role.Operator);
    }

    const accessToken = await this.jwtService.signAsync(
      { id: user.id, roles, platform },
      { expiresIn: '1d' },
    );

    return { access_token: accessToken };
  }
}
