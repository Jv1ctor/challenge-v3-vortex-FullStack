import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInResponseDto } from './dtos/sign-in-response.dto';
import bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService){}

  async signIn(username: string, password: string): Promise<SignInResponseDto>{
    const user = await this.usersService.getOneByName(username)

    if(!user) throw new UnauthorizedException()

    const matchPass = await bcrypt.compare(password, user.password)

    if(!matchPass) throw new UnauthorizedException()
      
    const accessToken = await this.jwtService.signAsync({}, { expiresIn: "2min" })

    return { access_token: accessToken }
  }
}
