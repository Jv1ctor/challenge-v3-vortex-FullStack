import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enums/role.enum';
import { Request } from 'express';
import { MACHINE_ACCESS_KEY } from 'src/common/decorators/machine-access.decorator';
import { MachinesService } from 'src/modules/machines/machines.service';

@Injectable()
export class MachineAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private machinesService: MachinesService,
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

    const belong = await this.machinesService.belongsFactoryByMachine(
      machineId,
      user.id,
    );

    return belong;
  }
}
