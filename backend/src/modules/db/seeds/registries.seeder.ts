import { Registries } from 'src/modules/registries/entities/registries.entity';
import { Machine } from 'src/modules/machines/entities/machine.entity';
import { Factory } from 'src/modules/factories/entities/factory.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';

export async function registriesSeeder(datasource: DataSource): Promise<void> {
  await datasource.query('TRUNCATE registries RESTART IDENTITY CASCADE');

  const machineRepository = datasource.getRepository(Machine);
  const userRepository = datasource.getRepository(User);
  const registryRepository = datasource.getRepository(Registries);

  // Buscar todas as máquinas com suas fábricas
  const machines = await machineRepository.find({ relations: ['factory'] });
  // Buscar todos os usuários com suas fábricas
  const users = await userRepository.find({ relations: ['factory'] });

  const registries: Partial<Registries>[] = [];

  // Meses do ano (Janeiro a Dezembro)
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  // Para cada máquina, criar 10 registries em 2025 e 10 em 2024
  machines.forEach((machine, machineIndex) => {
    // Filtrar usuários da mesma fábrica que a máquina
    const usersInSameFactory = users.filter(
      (user) => user.factory?.id === machine.factory?.id,
    );

    // Se não houver usuários na mesma fábrica, pular esta máquina
    if (usersInSameFactory.length === 0) {
      console.log(
        `⚠ Máquina ${machine.name} não tem usuários na mesma fábrica`,
      );
      return;
    }

    // Função auxiliar para criar N registros em um determinado ano
    const createForYear = (year: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const user = usersInSameFactory[i % usersInSameFactory.length];
        const month = months[(machineIndex * count + i) % 12];

        const day = Math.floor(Math.random() * 28) + 1;
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);

        const createdAt = new Date(Date.UTC(year, month, day, hour, minute));
        const value = parseFloat((Math.random() * 450 + 50).toFixed(2));

        registries.push({
          value,
          machine: { id: machine.id } as Machine,
          user: { id: user.id } as User,
          factory: { id: machine.factory!.id } as Factory,
          createdAt,
        });
      }
    };

    // Criar 10 registros em 2025 e 10 registros em 2024 por máquina
    createForYear(2025, 10);
    createForYear(2024, 10);
  });

  // Ordenar por data para inserir em ordem cronológica
  registries.sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());

  await registryRepository.save(registries);
  console.log(
    `✓ ${registries.length} registries criados (20 por máquina: 10 em 2025 e 10 em 2024)`,
  );
}
