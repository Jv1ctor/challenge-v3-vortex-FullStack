import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enums/role.enum';
import { Request } from 'express';
import { UsersService } from 'src/modules/users/users.service';
import { MACHINE_ACCESS_KEY } from 'src/common/decorators/machine-access.decorator';

@Injectable()
export class MachineAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const requireAccessMachine = this.reflector.getAllAndOverride<string>(
      MACHINE_ACCESS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requireAccessMachine) {
      return true;
    }

    const machineId = Number(request.params.id);
    const { user } = request;

    if (user.roles.includes(Role.Admin)) {
      return true;
    }

    const belong = await this.userService.belongsFactoryByMachine(
      machineId,
      user.id,
    );

    return belong;
  }
}
