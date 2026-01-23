import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FACTORY_ACCESS_KEY } from 'src/common/decorators/factory-access.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Request } from 'express';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class FactoryAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const requireAccessFactory = this.reflector.getAllAndOverride<string>(
      FACTORY_ACCESS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requireAccessFactory) {
      return true;
    }

    const factoryId = Number(request.params.id);
    const { user } = request;

    if (user.roles.includes(Role.Admin)) {
      return true;
    }

    const belong = await this.userService.belongsFactory(factoryId, user.id);

    return belong;
  }
}
