import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Factory } from './entities/factory.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFactoryResDto } from './dtos/create-factory-res-dto';

@Injectable()
export class FactoriesService {
  constructor(
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}


  // TODO(): mudar create para
  async createFactory(name: string): Promise<CreateFactoryResDto>{
    const existFactory = await this.factoryRepository.findOneBy({ name })

    if(existFactory) throw new BadRequestException("already exist factory")

    const result = await this.factoryRepository.insert({ name })
    return {
      id: result.generatedMaps[0].id,
    }
  }

  async registerUser(factoryId: number, userId: string){
    const factory = await this.factoryRepository.findOneBy({ id: factoryId })

    if(!factory) throw new BadRequestException("not found factory")

    await this.userRepository.update({ id: userId }, {  factory: { id: factoryId } })
  }
}
