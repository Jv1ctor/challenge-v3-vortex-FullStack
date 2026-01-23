export class GetUserWithFactoryDto {
  id: string;
  name: string;
  isAdmin: boolean;
  createdAt: Date;
  factory?: {
    id: number;
    name: string;
  };
}
