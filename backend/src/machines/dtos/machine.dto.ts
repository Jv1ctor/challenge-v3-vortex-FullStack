export class MachineDto {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  description: string;
  factory: {
    id: number;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
