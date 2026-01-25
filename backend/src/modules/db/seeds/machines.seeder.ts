import { Machine } from 'src/modules/machines/entities/machine.entity';
import { Factory } from 'src/modules/factories/entities/factory.entity';
import { DataSource } from 'typeorm';

export async function machinesSeeder(datasource: DataSource): Promise<void> {
  await datasource.query('TRUNCATE machines RESTART IDENTITY CASCADE');

  const factoryRepository = datasource.getRepository(Factory);
  const machineRepository = datasource.getRepository(Machine);

  // Buscar as factories criadas
  const factories = await factoryRepository.find();

  // Criar 10 máquinas distribuídas entre as factories
  const machines = [
    {
      name: 'torno cnc-001',
      model: 'CNC-500X',
      manufacturer: 'TechMachine',
      description: 'Torno CNC de alta precisão para usinagem',
      factory: factories[0], // Fábrica Norte
    },
    {
      name: 'fresadora frs-200',
      model: 'FRS-200M',
      manufacturer: 'IndustrialPro',
      description: 'Fresadora universal com 3 eixos',
      factory: factories[0], // Fábrica Norte
    },
    {
      name: 'prensa hidráulica ph-300',
      model: 'PH-300T',
      manufacturer: 'HydroForce',
      description: 'Prensa hidráulica de 300 toneladas',
      factory: factories[0], // Fábrica Norte
    },
    {
      name: 'solda robótica sr-100',
      model: 'SR-100A',
      manufacturer: 'RoboWeld',
      description: 'Célula de solda robotizada com 6 eixos',
      factory: factories[0], // Fábrica Norte
    },
    {
      name: 'extrusora ext-450',
      model: 'EXT-450P',
      manufacturer: 'PlastiMaq',
      description: 'Extrusora de plástico industrial',
      factory: factories[1], // Fábrica Sul
    },
    {
      name: 'injetora inj-800',
      model: 'INJ-800E',
      manufacturer: 'PlastiMaq',
      description: 'Injetora de plástico elétrica',
      factory: factories[1], // Fábrica Sul
    },
    {
      name: 'compressor cmp-500',
      model: 'CMP-500V',
      manufacturer: 'AirTech',
      description: 'Compressor de ar industrial de parafuso',
      factory: factories[1], // Fábrica Sul
    },
    {
      name: 'esteira transportadora est-1000',
      model: 'EST-1000C',
      manufacturer: 'TransBelt',
      description: 'Esteira transportadora com 10 metros',
      factory: factories[2], // Fábrica Leste
    },
    {
      name: 'empilhadeira elétrica emp-200',
      model: 'EMP-200L',
      manufacturer: 'LiftPower',
      description: 'Empilhadeira elétrica com capacidade de 2 toneladas',
      factory: factories[2], // Fábrica Leste
    },
    {
      name: 'guilhotina gil-300',
      model: 'GIL-300H',
      manufacturer: 'MetalCut',
      description: 'Guilhotina hidráulica para corte de chapas',
      factory: factories[2], // Fábrica Leste
    },
    // Máquinas para fábricas novas (cada uma receberá 5 máquinas)
    // Fábrica Central (factories[3])
    {
      name: 'linha montagem lm-101',
      model: 'LM-101',
      manufacturer: 'AssembleCo',
      description: 'Linha de montagem automatizada',
      factory: factories[3],
    },
    {
      name: 'trefiladora trf-20',
      model: 'TRF-20',
      manufacturer: 'WireTech',
      description: 'Trefiladora industrial para fios',
      factory: factories[3],
    },
    {
      name: 'cortadora ct-80',
      model: 'CT-80',
      manufacturer: 'CutMaster',
      description: 'Cortadora de chapas de alta precisão',
      factory: factories[3],
    },
    {
      name: 'laser cut-700',
      model: 'CUT-700',
      manufacturer: 'LaserWorks',
      description: 'Sistema de corte a laser CNC',
      factory: factories[3],
    },
    {
      name: 'robô pintura rp-20',
      model: 'RP-20',
      manufacturer: 'PaintBot',
      description: 'Robô para pintura automatizada',
      factory: factories[3],
    },
    // Fábrica Oeste (factories[4])
    {
      name: 'prensa pr-450',
      model: 'PR-450',
      manufacturer: 'PressCo',
      description: 'Prensa excêntrica para estampagem',
      factory: factories[4],
    },
    {
      name: 'usinadora us-330',
      model: 'US-330',
      manufacturer: 'UsinaTech',
      description: 'Usinadora CNC para peças complexas',
      factory: factories[4],
    },
    {
      name: 'balanceadora bl-10',
      model: 'BL-10',
      manufacturer: 'BalancePro',
      description: 'Balanceadora dinâmica para rotores',
      factory: factories[4],
    },
    {
      name: 'túnel resfriamento tr-2',
      model: 'TR-2',
      manufacturer: 'CoolLine',
      description: 'Túnel de resfriamento contínuo',
      factory: factories[4],
    },
    {
      name: 'empacotadora ep-900',
      model: 'EP-900',
      manufacturer: 'PackIt',
      description: 'Empacotadora automática de caixas',
      factory: factories[4],
    },
    // Fábrica Nordeste (factories[5])
    {
      name: 'secador sd-100',
      model: 'SD-100',
      manufacturer: 'DryTech',
      description: 'Secador industrial por convecção',
      factory: factories[5],
    },
    {
      name: 'misturador mx-50',
      model: 'MX-50',
      manufacturer: 'MixCorp',
      description: 'Misturador industrial para compósitos',
      factory: factories[5],
    },
    {
      name: 'cilindro laminador cl-200',
      model: 'CL-200',
      manufacturer: 'RollTech',
      description: 'Laminadora de rolos para materiais',
      factory: factories[5],
    },
    {
      name: 'forno industrial fi-800',
      model: 'FI-800',
      manufacturer: 'HeatMaster',
      description: 'Forno para tratamentos térmicos',
      factory: factories[5],
    },
    {
      name: 'separadora sp-60',
      model: 'SP-60',
      manufacturer: 'SepaTech',
      description: 'Separadora por densidade',
      factory: factories[5],
    },
    // Fábrica Centro-Sul (factories[6])
    {
      name: 'corte plasma cp-300',
      model: 'CP-300',
      manufacturer: 'PlasmaCut',
      description: 'Máquina de corte por plasma',
      factory: factories[6],
    },
    {
      name: 'politriz pl-10',
      model: 'PL-10',
      manufacturer: 'ShineCo',
      description: 'Politriz industrial para acabamento',
      factory: factories[6],
    },
    {
      name: 'estação de testes et-7',
      model: 'ET-7',
      manufacturer: 'TestLab',
      description: 'Estação para testes de qualidade',
      factory: factories[6],
    },
    {
      name: 'cnc router cr-550',
      model: 'CR-550',
      manufacturer: 'RouteTech',
      description: 'Router CNC para usinagem fina',
      factory: factories[6],
    },
    {
      name: 'batedeira industrial bi-400',
      model: 'BI-400',
      manufacturer: 'MixMaster',
      description: 'Batedeira para massas industriais',
      factory: factories[6],
    },
    // Fábrica Internacional (factories[7])
    {
      name: 'printer 3d p3-1000',
      model: 'P3-1000',
      manufacturer: 'AddiFab',
      description: 'Impressora 3D industrial',
      factory: factories[7],
    },
    {
      name: 'câmara climática cc-20',
      model: 'CC-20',
      manufacturer: 'ClimateTest',
      description: 'Câmara para teste de condições climáticas',
      factory: factories[7],
    },
    {
      name: 'cortadora routers cr-220',
      model: 'CR-220',
      manufacturer: 'CutPro',
      description: 'Cortadora para materiais compostos',
      factory: factories[7],
    },
    {
      name: 'inspetor óptico io-900',
      model: 'IO-900',
      manufacturer: 'OptiScan',
      description: 'Sistema de inspeção óptica automatizada',
      factory: factories[7],
    },
    {
      name: 'estação robótica er-12',
      model: 'ER-12',
      manufacturer: 'RoboWorks',
      description: 'Estação robótica para montagem fina',
      factory: factories[7],
    },
  ];

  await machineRepository.save(machines);
  console.log(`✓ ${machines.length} máquinas criadas`);
}
