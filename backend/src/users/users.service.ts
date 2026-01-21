import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GetUserWithPasswordDto } from './dtos/get-user-with-password.dto';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { GetUserWithFactoryDto } from './dtos/get-user-with-factory.dto';
import { Machine } from 'src/machines/entities/machine.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
    private readonly configService: ConfigService,
  ) {}

  async getOneByIdWithFactory(id: string): Promise<GetUserWithFactoryDto> {
    const user = await this.userRepository.findOne({
      select: {
        id: true,
        name: true,
        isAdmin: true,
        createdAt: true,
        factory: {
          id: true,
          name: true,
        },
      },
      where: {
        id,
      },
      relations: {
        factory: true,
      },
    });

    if (!user) throw new BadRequestException('not found user');

    return user;
  }

  async getOneByNameWithPassword(
    name: string,
  ): Promise<GetUserWithPasswordDto | null> {
    return this.userRepository.findOneBy({ name });
  }

  async belongsFactory(factoryId: number, userId: string): Promise<boolean> {
    const relation = await this.userRepository.findOne({
      where: { id: userId, factory: { id: factoryId } },
    });
    return !!relation;
  }

  async belongsFactoryByMachine(
    machineId: number,
    userId: string,
  ): Promise<boolean> {
    const relation = await this.machineRepository.findOne({
      where: { id: machineId, factory: { users: { id: userId } } },
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
