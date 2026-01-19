import { SetMetadata } from '@nestjs/common';
import { Platform } from '../enums/platform.enum';

export const PLATFORM_KEY = 'platform';
export const PlatformSelect = (platforms: Platform) =>
  SetMetadata(PLATFORM_KEY, platforms);
