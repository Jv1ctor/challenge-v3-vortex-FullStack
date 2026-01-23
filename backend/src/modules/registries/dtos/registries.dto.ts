export class RegistriesDto {
  id: number;
  value: number;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    isAdmin: boolean;
  };
}
