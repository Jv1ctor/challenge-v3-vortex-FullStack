import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GetUserWithPasswordDto } from './dtos/get-user-with-password.dto';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { GetUserWithFactoryDto } from './dtos/get-user-with-factory.dto';
import { GetOperatorInfo } from './dtos/get-operator-info.dto';
import { ErrorMessage } from 'src/common/enums/error-message.enum';
import { UsersByFactoryDto } from './dtos/users-by-factory.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // @InjectRepository(Machine)
    // private readonly machineRepository: Repository<Machine>,
    private readonly configService: ConfigService,
  ) {}

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
      throw new NotFoundException(ErrorMessage.OPERATOR_INFO_NOT_FOUND);
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

    if (!user) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

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

  async createUserOperator(name: string, password: string) {
    const existUsername = await this.userRepository.findOneBy({ name });

    if (existUsername)
      throw new ConflictException(ErrorMessage.USERNAME_ALREADY_EXISTS);

    const saltRounds = Number(
      this.configService.get<number>('BCRYPT_SALT_ROUNDS', 10),
    );
    const hashedPass = await bcrypt.hash(password, saltRounds);

    await this.userRepository.insert({
      name,
      password: hashedPass,
    });
  }

  async updatePasswordUser(userId: string, password: string) {
    const existUser = await this.userRepository.findOneBy({ id: userId });

    if (!existUser) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    const saltRounds = Number(
      this.configService.get<number>('BCRYPT_SALT_ROUNDS', 10),
    );
    const hashedPass = await bcrypt.hash(password, saltRounds);

    await this.userRepository.update({ id: userId }, { password: hashedPass });
  }

  async addUserInFactory(factoryId: number, userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: { factory: true },
    });

    if (!user || user?.deletedAt)
      throw new ConflictException(ErrorMessage.USER_ALREADY_DELETED);

    if (!user) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    if (user.factory !== null && user.factory.id)
      throw new ConflictException(
        ErrorMessage.USER_ALREADY_ASSIGNED_TO_FACTORY,
      );

    await this.userRepository.update(
      { id: userId },
      { factory: { id: factoryId } },
    );
  }

  async getAllUserByFactory(factoryId: number): Promise<UsersByFactoryDto[]> {
    return await this.userRepository
      .createQueryBuilder('users')
      .leftJoin('registries', 'r', ' r.user_id = users.id')
      .leftJoin('machines', 'm', 'm.id = r.machine_id')
      .select(['users.id AS id', 'users.name AS name'])
      .addSelect('COUNT(r.id)::int', 'total_registries')
      .addSelect(
        'MAX(r.created_at) FILTER (WHERE r.id IS NOT NULL)',
        'last_registry_at',
      )
      .where('users.factory_id = :factoryId', { factoryId })
      .groupBy('users.id')
      .addGroupBy('users.name')
      .getRawMany<UsersByFactoryDto>();
  }

  async registerUserInFactory(
    factoryId: number,
    username: string,
    password: string,
  ) {
    const existUser = await this.userRepository.findOne({
      where: {
        name: username,
      },
      relations: { factory: true },

      withDeleted: true,
    });

    if (existUser && existUser.deletedAt)
      throw new ConflictException(
        ErrorMessage.USERNAME_ALREADY_EXIST_IN_DELETED_USER,
      );

    if (existUser)
      throw new ConflictException(ErrorMessage.USERNAME_ALREADY_EXISTS);

    const saltRounds = Number(
      this.configService.get<number>('BCRYPT_SALT_ROUNDS', 10),
    );
    const hashedPass = await bcrypt.hash(password, saltRounds);

    await this.userRepository.insert({
      name: username,
      password: hashedPass,
      factory: { id: factoryId },
    });
  }

  async disableUser(userId: string) {
    const user = await this.userRepository.findOneBy({
      id: userId,
      isAdmin: false,
    });

    if (!user) {
      throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
    }

    if (user.deletedAt) {
      return;
    }

    await this.userRepository.softDelete({
      id: userId,
      isAdmin: Not(true),
    });
  }
}
