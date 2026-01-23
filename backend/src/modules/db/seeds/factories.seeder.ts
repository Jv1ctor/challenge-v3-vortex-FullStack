import { Factory } from 'src/modules/factories/entities/factory.entity';
import { DataSource } from 'typeorm';

export async function factoriesSeeder(datasource: DataSource): Promise<void> {
  await datasource.query('TRUNCATE factories RESTART IDENTITY CASCADE');

  const repository = datasource.getRepository(Factory);

  const factories = [
    {
      name: 'Fábrica Norte',
      address: 'Rua das Indústrias, 1250',
      city: 'São Paulo',
      country: 'Brasil',
    },
    {
      name: 'Fábrica Sul',
      address: 'Avenida dos Estados, 3400',
      city: 'Porto Alegre',
      country: 'Brasil',
    },
    {
      name: 'Fábrica Leste',
      address: 'Rodovia BR-101, Km 45',
      city: 'Rio de Janeiro',
      country: 'Brasil',
    },
  ];

  await repository.insert(factories);
  console.log('✓ 3 factories criadas');
}
