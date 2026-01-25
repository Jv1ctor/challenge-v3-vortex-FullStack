import { Factory } from 'src/modules/factories/entities/factory.entity';
import { DataSource } from 'typeorm';

export async function factoriesSeeder(datasource: DataSource): Promise<void> {
  await datasource.query('TRUNCATE factories RESTART IDENTITY CASCADE');

  const repository = datasource.getRepository(Factory);

  const factories = [
    {
      name: 'fábrica norte',
      address: 'Rua das Indústrias, 1250',
      city: 'São Paulo',
      country: 'Brasil',
    },
    {
      name: 'fábrica sul',
      address: 'Avenida dos Estados, 3400',
      city: 'Porto Alegre',
      country: 'Brasil',
    },
    {
      name: 'fábrica leste',
      address: 'Rodovia BR-101, Km 45',
      city: 'Rio de Janeiro',
      country: 'Brasil',
    },
    {
      name: 'fábrica central',
      address: 'Praça Central, 100',
      city: 'Belo Horizonte',
      country: 'Brasil',
    },
    {
      name: 'fábrica oeste',
      address: 'Avenida do Progresso, 750',
      city: 'Curitiba',
      country: 'Brasil',
    },
    {
      name: 'fábrica nordeste',
      address: 'Rua do Sol, 220',
      city: 'Salvador',
      country: 'Brasil',
    },
    {
      name: 'fábrica centro-sul',
      address: 'Alameda das Flores, 900',
      city: 'Florianópolis',
      country: 'Brasil',
    },
    {
      name: 'fábrica internacional',
      address: 'Avenida das Nações, 5000',
      city: 'Manaus',
      country: 'Brasil',
    },
  ];

  await repository.insert(factories);
  console.log(`✓ ${factories.length} factories criadas`);
}
