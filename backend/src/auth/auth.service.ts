import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/role.enum';
import { Platform } from 'src/common/enums/platform.enum';
import { SignInDto } from './dtos/sign-in.dto';

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
  ): Promise<SignInDto> {
    const user = await this.usersService.getOneByNameWithPassword(username);

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

    return { id: user.id, access_token: accessToken };
  }
}
