import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminBootstrapService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(AdminBootstrapService.name);

  async onModuleInit() {
    const user = await this.usersRepository.count();
    if (user > 0) return;

    const usernameAdmin = this.configService.get<string>('ADMIN_USERNAME');
    const passworAdmin = this.configService.get<string>('ADMIN_PASSWORD');

    if (!usernameAdmin || !passworAdmin) {
      this.logger.error('admin user not defined');
      return;
    }
    const saltRounds = Number(
      this.configService.get<number>('BCRYPT_SALT_ROUNDS', 10),
    );
    const hashedPass = await bcrypt.hash(passworAdmin, saltRounds);

    await this.usersRepository.insert({
      name: usernameAdmin,
      password: hashedPass,
      isAdmin: true,
    });

    this.logger.log('admin user created');
  }
}
