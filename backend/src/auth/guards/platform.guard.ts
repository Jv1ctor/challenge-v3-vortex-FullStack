import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PLATFORM_KEY } from 'src/common/decorators/platform.decorator';
import { Platform } from 'src/common/enums/platform.enum';

@Injectable()
export class PlatformGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const requiredPlatforms = this.reflector.getAllAndOverride<Platform[]>(
      PLATFORM_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPlatforms) {
      return true;
    }
    const { user } = request;

    return requiredPlatforms.toString() === user.platform;
  }
}
