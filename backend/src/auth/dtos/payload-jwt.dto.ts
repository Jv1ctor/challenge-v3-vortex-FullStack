import { Platform } from 'src/common/enums/platform.enum';
import { Role } from 'src/common/enums/role.enum';

export class PayloadJwtDto {
  id: string;
  roles: Role[];
  platform: Platform;
}
