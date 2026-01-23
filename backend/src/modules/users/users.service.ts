import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GetUserWithPasswordDto } from './dtos/get-user-with-password.dto';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { GetUserWithFactoryDto } from './dtos/get-user-with-factory.dto';
import { Machine } from 'src/modules/machines/entities/machine.entity';
import { GetOperatorInfo } from './dtos/get-operator-info.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
    private readonly configService: ConfigService,
  ) {}

  // select users.id, users.name, factories.name as factory_name, count(registries.id) as total_registries, max(registries.created_at) as last_registry_at
  // from users
  // left join registries on registries.user_id = users.id
  // left join factories on factories.id = users.factory_id
  // WHERE users.id = 'e877fa68-fd60-44e3-b950-aa08130d19d8'
  // GROUP BY users.name, users.id, factory_name LIMIT 100

  async getOperatorInfo(id: string): Promise<GetOperatorInfo> {
    const operator = await this.userRepository
      .createQueryBuilder('u')
      .leftJoin('registries', 'r', 'r.user_id = u.id')
      .leftJoin('factories', 'f', 'f.id = u.factory_id')
      .select(['u.id AS id', 'u.name AS name', 'f.name As factory_name'])
      .addSelect('COUNT(r.id)::int', 'total_registries')
      .addSelect('MAX(r.created_at)', 'last_registry_at')
      .where('u.id = :userId', { userId: id })
      .groupBy('u.id')
      .addGroupBy('u.name')
      .addGroupBy('f.name')
      .getRawOne<GetOperatorInfo>();

    if (!operator) {
      throw new BadRequestException('not found operator info');
    }
    return operator;
  }

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
