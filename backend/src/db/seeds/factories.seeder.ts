import { Factory } from 'src/factories/entities/factory.entity';
import { DataSource } from 'typeorm';

export async function factoriesSeeder(datasource: DataSource): Promise<void> {
  await datasource.query("TRUNCATE factories RESTART IDENTITY CASCADE");

  const repository = datasource.getRepository(Factory);

  const factories = [
    { name: 'Fábrica Norte' },
    { name: 'Fábrica Sul' },
    { name: 'Fábrica Leste' },
  ];

  await repository.insert(factories);
  console.log('✓ 3 factories criadas');
}
