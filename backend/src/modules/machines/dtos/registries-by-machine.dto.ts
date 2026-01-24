export class RegistriesMinDto {
  id: number;
  value: number;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    isAdmin: boolean;
  };
}
export class RegistriesByMachineDto {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  description: string;
  data: RegistriesMinDto[];
}
