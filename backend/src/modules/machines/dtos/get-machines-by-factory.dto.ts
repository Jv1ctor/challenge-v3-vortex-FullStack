export class GetMachinesByFactoryDto {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  description: string;
  total_registries: number;
  total_value: number;
  last_registry_at: Date;
  createdAt: Date;
  updatedAt: Date;
}
