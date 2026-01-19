import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GetUserDto } from './dtos/get-user.dto';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async getOneByName(name: string): Promise<GetUserDto | null> {
    return this.userRepository.findOneBy({ name });
  }

  async belongsFactory(factoryId: number, userId: string): Promise<boolean> {
    const relation = await this.userRepository.findOne({
      where: { id: userId, factory: { id: factoryId } },
    });
    return !!relation;
  }

  async createUserOperator(name: string, password: string) {
    const existUsername = await this.userRepository.findOneBy({ name });

    if (existUsername) throw new BadRequestException('exist username');

    const saltRounds = Number(
      this.configService.get<number>('BCRYPT_SALT_ROUNDS', 10),
    );
    const hashedPass = await bcrypt.hash(password, saltRounds);

    await this.userRepository.insert({
      name,
      password: hashedPass,
    });
  }
}
