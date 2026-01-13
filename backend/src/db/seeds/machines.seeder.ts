import { Machine } from 'src/machines/entities/machine.entity';
import { Factory } from 'src/factories/entities/factory.entity';
import { DataSource } from 'typeorm';

export async function machinesSeeder(datasource: DataSource): Promise<void> {
  await datasource.query("TRUNCATE machines RESTART IDENTITY CASCADE");

  const factoryRepository = datasource.getRepository(Factory);
  const machineRepository = datasource.getRepository(Machine);

  // Buscar as factories criadas
  const factories = await factoryRepository.find();

  // Criar 10 máquinas distribuídas entre as factories
  const machines = [
    {
      name: 'Torno CNC-001',
      model: 'CNC-500X',
      manufacturer: 'TechMachine',
      description: 'Torno CNC de alta precisão para usinagem',
      factory: factories[0], // Fábrica Norte
    },
    {
      name: 'Fresadora FRS-200',
      model: 'FRS-200M',
      manufacturer: 'IndustrialPro',
      description: 'Fresadora universal com 3 eixos',
      factory: factories[0], // Fábrica Norte
    },
    {
      name: 'Prensa Hidráulica PH-300',
      model: 'PH-300T',
      manufacturer: 'HydroForce',
      description: 'Prensa hidráulica de 300 toneladas',
      factory: factories[0], // Fábrica Norte
    },
    {
      name: 'Solda Robótica SR-100',
      model: 'SR-100A',
      manufacturer: 'RoboWeld',
      description: 'Célula de solda robotizada com 6 eixos',
      factory: factories[0], // Fábrica Norte
    },
    {
      name: 'Extrusora EXT-450',
      model: 'EXT-450P',
      manufacturer: 'PlastiMaq',
      description: 'Extrusora de plástico industrial',
      factory: factories[1], // Fábrica Sul
    },
    {
      name: 'Injetora INJ-800',
      model: 'INJ-800E',
      manufacturer: 'PlastiMaq',
      description: 'Injetora de plástico elétrica',
      factory: factories[1], // Fábrica Sul
    },
    {
      name: 'Compressor CMP-500',
      model: 'CMP-500V',
      manufacturer: 'AirTech',
      description: 'Compressor de ar industrial de parafuso',
      factory: factories[1], // Fábrica Sul
    },
    {
      name: 'Esteira Transportadora EST-1000',
      model: 'EST-1000C',
      manufacturer: 'TransBelt',
      description: 'Esteira transportadora com 10 metros',
      factory: factories[2], // Fábrica Leste
    },
    {
      name: 'Empilhadeira Elétrica EMP-200',
      model: 'EMP-200L',
      manufacturer: 'LiftPower',
      description: 'Empilhadeira elétrica com capacidade de 2 toneladas',
      factory: factories[2], // Fábrica Leste
    },
    {
      name: 'Guilhotina GIL-300',
      model: 'GIL-300H',
      manufacturer: 'MetalCut',
      description: 'Guilhotina hidráulica para corte de chapas',
      factory: factories[2], // Fábrica Leste
    },
  ];

  await machineRepository.save(machines);
  console.log('✓ 10 máquinas criadas');
}
