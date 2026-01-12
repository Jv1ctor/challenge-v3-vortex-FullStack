import { DataSource } from 'typeorm';
import { factoriesSeeder } from './factories.seeder';
import { usersSeeder } from './users.seeder';
import { machinesSeeder } from './machines.seeder';
import { registriesSeeder } from './registries.seeder';
import { Factory } from 'src/factories/entities/factory.entity';
import { User } from 'src/users/entities/user.entity';
import { Registries } from 'src/registries/entities/registries.entity';
import { Machine } from 'src/machines/entities/machine.entity';

const datasource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  synchronize: process.env.NODE_ENV !== 'production',
  entities: [Factory, User, Registries, Machine],
});

async function run() {
  try {
    console.log('Inicializando conexão com o banco de dados...');
    await datasource.initialize();

    console.log('\n🌱 Executando seeders...\n');
    await factoriesSeeder(datasource);
    await usersSeeder(datasource);
    await machinesSeeder(datasource);
    await registriesSeeder(datasource);

    console.log('\n✅ Seeders executados com sucesso!');
    await datasource.destroy();
  } catch (error) {
    console.error('❌ Erro ao executar seeders:', error);
    await datasource.destroy();
    process.exit(1);
  }
}

run();
