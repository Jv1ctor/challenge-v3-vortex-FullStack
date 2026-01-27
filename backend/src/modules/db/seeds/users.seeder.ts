import { User } from 'src/modules/users/entities/user.entity';
import { Factory } from 'src/modules/factories/entities/factory.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export async function usersSeeder(datasource: DataSource): Promise<void> {
  await datasource.query('TRUNCATE users RESTART IDENTITY CASCADE');

  const factoryRepository = datasource.getRepository(Factory);
  const userRepository = datasource.getRepository(User);

  // Buscar as factories criadas
  const factories = await factoryRepository.find();

  // Função utilitária: garante nome com mínimo de 7 caracteres
  const ensureMinName = (n: string) => (n.length >= 7 ? n : n.padEnd(7, 'x'));

  // Hash da senha padrão (mínimo 8 caracteres)
  const defaultPassword = 'senha1234';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  // Criar 5 usuários normais distribuídos entre as factories (nomes garantidos com >=7 chars)
  const users = [
    {
      name: ensureMinName('joão_silva'),
      password: hashedPassword,
      isAdmin: false,
      factory: factories[0], // fábrica norte
    },
    {
      name: ensureMinName('maria_santos'),
      password: hashedPassword,
      isAdmin: false,
      factory: factories[0], // fábrica norte
    },
    {
      name: ensureMinName('pedro_oliveira'),
      password: hashedPassword,
      isAdmin: false,
      factory: factories[1], // fábrica sul
    },
    {
      name: ensureMinName('ana_costa'),
      password: hashedPassword,
      isAdmin: false,
      factory: factories[1], // fábrica sul
    },
    {
      name: ensureMinName('carlos_souza'),
      password: hashedPassword,
      isAdmin: false,
      factory: factories[2], // fábrica leste
    },
  ];

  // Adicionar 3 usuários para cada fábrica nova (indices 3..)
  for (let f = 3; f < factories.length; f++) {
    for (let u = 1; u <= 3; u++) {
      const rawName = `user_${f + 1}_${u}`;
      users.push({
        name: ensureMinName(rawName),
        password: hashedPassword,
        isAdmin: false,
        factory: factories[f],
      });
    }
  }

  await userRepository.save(users);
  console.log(`✓ ${users.length} usuários criados`);
}
