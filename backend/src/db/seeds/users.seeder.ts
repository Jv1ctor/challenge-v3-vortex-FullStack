import { User } from 'src/users/entities/user.entity';
import { Factory } from 'src/factories/entities/factory.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export async function usersSeeder(datasource: DataSource): Promise<void> {
  await datasource.query("TRUNCATE users RESTART IDENTITY CASCADE");

  const factoryRepository = datasource.getRepository(Factory);
  const userRepository = datasource.getRepository(User);

  // Buscar as factories criadas
  const factories = await factoryRepository.find();

  // Hash da senha padrão
  const hashedPassword = await bcrypt.hash('senha123', 10);

  // Criar 5 usuários normais distribuídos entre as factories
  const users = [
    {
      name: 'João Silva',
      password: hashedPassword,
      isAdmin: false,
      factory: factories[0], // Fábrica Norte
    },
    {
      name: 'Maria Santos',
      password: hashedPassword,
      isAdmin: false,
      factory: factories[0], // Fábrica Norte
    },
    {
      name: 'Pedro Oliveira',
      password: hashedPassword,
      isAdmin: false,
      factory: factories[1], // Fábrica Sul
    },
    {
      name: 'Ana Costa',
      password: hashedPassword,
      isAdmin: false,
      factory: factories[1], // Fábrica Sul
    },
    {
      name: 'Carlos Souza',
      password: hashedPassword,
      isAdmin: false,
      factory: factories[2], // Fábrica Leste
    },
  ];

  await userRepository.save(users);
  console.log('✓ 5 usuários criados');
}
