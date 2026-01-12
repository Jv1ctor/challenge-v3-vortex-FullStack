import { Registries } from 'src/registries/entities/registries.entity';
import { Machine } from 'src/machines/entities/machine.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export async function registriesSeeder(datasource: DataSource): Promise<void> {
  await datasource.query("TRUNCATE registries RESTART IDENTITY CASCADE");

  const machineRepository = datasource.getRepository(Machine);
  const userRepository = datasource.getRepository(User);
  const registryRepository = datasource.getRepository(Registries);

  // Buscar todas as máquinas e usuários
  const machines = await machineRepository.find();
  const users = await userRepository.find();

  const registries: Partial<Registries>[] = [];

  // Meses de 2025 (Janeiro a Dezembro)
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  // Para cada máquina, criar 5 registries em meses diferentes
  machines.forEach((machine, machineIndex) => {
    console.log(machine)
    for (let i = 0; i < 5; i++) {
      // Selecionar um usuário de forma distribuída
      const user = users[i % users.length];

      // Selecionar um mês diferente para cada registry
      const month = months[(machineIndex * 5 + i) % 12];

      // Criar data aleatória no mês selecionado
      const day = Math.floor(Math.random() * 28) + 1; // Dias de 1 a 28 para evitar problemas com meses diferentes
      const hour = Math.floor(Math.random() * 24);
      const minute = Math.floor(Math.random() * 60);

      const createdAt = new Date(2025, month, day, hour, minute);

      // Gerar valor aleatório de consumo entre 50 e 500 kWh
      const value = parseFloat((Math.random() * 450 + 50).toFixed(2));

      registries.push({
        value,
        machine: { id: machine.id } as Machine,
        user: { id: user.id} as User,
        createdAt,
      });
    }
  });

  // Ordenar por data para inserir em ordem cronológica
  registries.sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());

  await registryRepository.save(registries);
  console.log(
    `✓ ${registries.length} registries criados (5 por máquina, distribuídos em 2025)`,
  );
}
