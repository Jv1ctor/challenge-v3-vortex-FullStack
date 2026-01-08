import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GetUserDto } from './dtos/get-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async getOneByName(name: string): Promise<GetUserDto | null> {
    return this.userRepository.findOneBy({ name })
  }
}
