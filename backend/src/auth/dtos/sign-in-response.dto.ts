export class SignInResponseDto {
  id: string;
  name: string;
  isAdmin: boolean;
  factoryId: number | null;
  access_token: string;
}
