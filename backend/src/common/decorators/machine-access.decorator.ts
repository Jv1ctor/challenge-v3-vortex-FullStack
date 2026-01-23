import { SetMetadata } from '@nestjs/common';

export const MACHINE_ACCESS_KEY = 'machine_access';
export const MachineAccess = () =>
  SetMetadata(MACHINE_ACCESS_KEY, 'machine_access_verify');
