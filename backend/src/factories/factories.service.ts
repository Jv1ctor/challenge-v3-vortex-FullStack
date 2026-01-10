import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Factory } from './entities/factory.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFactoryResDto } from './dtos/create-factory-res.dto';
import { GetAllFactoriesMinDto } from './dtos/get-all-factories-min.dto';
import { FactoriesMinDto } from './dtos/factories-min.dto';
import { UsersByFactoryDto } from './dtos/users-by-factory.dto';

@Injectable()
export class FactoriesService {
  constructor(
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createFactory(name: string): Promise<CreateFactoryResDto> {
    const existFactory = await this.factoryRepository.findOneBy({ name });

    if (existFactory) throw new BadRequestException('already exist factory');

    const result = await this.factoryRepository.insert({ name });
    return {
      id: result.generatedMaps[0].id,
    };
  }

  async registerUser(factoryId: number, userId: string) {
    const factory = await this.factoryRepository.findOneBy({ id: factoryId });

    if (!factory) throw new BadRequestException('not found factory');

    const user = await this.userRepository.findOne({ 
      where: { 
        id: userId
      },
      relations: { factory: true }
    })

    if(!user) throw new BadRequestException("not found user")

    if(user.factory !== null && user.factory.id) throw new BadRequestException('already registed factory')

    await this.userRepository.update(
      { id: userId },
      { factory: { id: factoryId } },
    );
  }

  async getAllFactories(): Promise<FactoriesMinDto[]> {
    return await this.factoryRepository.find({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getAllUserByFactory(factoryId: number): Promise<UsersByFactoryDto[]>{
   return await this.userRepository.find({
      select: { name: true },
      where: { factory: { id: factoryId } }
    })
  }
}
''