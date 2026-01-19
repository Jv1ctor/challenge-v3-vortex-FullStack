import { SetMetadata } from '@nestjs/common';

export const FACTORY_ACCESS_KEY = 'factory_access';
export const FactoryAccess = () =>
  SetMetadata(FACTORY_ACCESS_KEY, 'factory_access_verify');
