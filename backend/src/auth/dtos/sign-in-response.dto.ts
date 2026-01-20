export class SignInResponseDto {
  id: string;
  name: string;
  isAdmin: boolean;
  facotyId: number | null;
  access_token: string;
}
