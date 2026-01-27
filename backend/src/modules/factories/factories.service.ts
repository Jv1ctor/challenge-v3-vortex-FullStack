import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { Factory } from './entities/factory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFactoryResDto } from './dtos/create-factory-res.dto';
import { FactoriesMinDto } from './dtos/factories-min.dto';
import { UpdateFactoryDto } from './dtos/update-factory.dto';
import { ErrorMessage } from 'src/common/enums/error-message.enum';

@Injectable()
export class FactoriesService {
  constructor(
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
  ) {}

  async createFactory(
    name: string,
    address?: string,
    city?: string,
    country?: string,
  ): Promise<CreateFactoryResDto> {
    const existFactory = await this.factoryRepository.findOne({
      where: { name },
      withDeleted: true,
    });

    if (existFactory && existFactory.deletedAt)
      throw new ConflictException(
        ErrorMessage.FACTORY_ALREADY_EXIST_IN_DELETED_FACTORY,
      );

    if (existFactory)
      throw new ConflictException(ErrorMessage.FACTORY_ALREADY_REGISTERED);

    const result = await this.factoryRepository.insert({
      name,
      address,
      city,
      country,
    });
    return {
      id: result.generatedMaps[0].id as number,
    };
  }

  async getFactoryInfo(factoryId: number) {
    const factory = await this.factoryRepository.findOneBy({ id: factoryId });

    if (!factory) throw new NotFoundException(ErrorMessage.FACTORY_NOT_FOUND);

    return factory;
  }

  async updateFactory(factoryId: number, factory: UpdateFactoryDto) {
    const existNameFactory = await this.factoryRepository.findOne({
      where: {
        name: factory.name,
        id: Not(factoryId),
      },
      withDeleted: true,
    });

    if (existNameFactory && existNameFactory.deletedAt)
      throw new ConflictException(
        ErrorMessage.FACTORY_ALREADY_EXIST_IN_DELETED_FACTORY,
      );

    if (existNameFactory)
      throw new ConflictException(ErrorMessage.FACTORY_NAME_ALREADY_USED);

    await this.factoryRepository.update({ id: factoryId }, { ...factory });
  }

  async getAllFactories(): Promise<FactoriesMinDto[]> {
    const factories = await this.factoryRepository.find({
      select: {
        id: true,
        name: true,
        city: true,
        address: true,
        country: true,
      },
      relations: {
        users: true,
        machines: true,
      },
    });

    return factories.map((i) => ({
      id: i.id,
      name: i.name,
      address: i.address,
      city: i.city,
      country: i.country,
      count_machines: i.machines.length,
      count_users: i.users.length,
    }));
  }

  async disableFactory(factoryId: number) {
    const factory = await this.factoryRepository.findOneBy({
      id: factoryId,
    });

    if (!factory) {
      throw new NotFoundException(ErrorMessage.FACTORY_NOT_FOUND);
    }

    if (factory.deletedAt) {
      return;
    }

    await this.factoryRepository.softDelete({
      id: factoryId,
    });
  }
}
