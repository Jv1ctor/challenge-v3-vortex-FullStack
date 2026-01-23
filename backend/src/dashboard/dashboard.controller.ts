import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { GroupsSchema, type GroupsDto } from './dtos/groups.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { PlatformSelect } from 'src/common/decorators/platform.decorator';
import { Platform } from 'src/common/enums/platform.enum';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly DashboardService: DashboardService) {}

  @Get('consumption')
  @Roles(Role.Admin, Role.Manager)
  @PlatformSelect(Platform.Web)
  async consupmtionDashboard(
    @Query('groupBy', new ZodValidationPipe(GroupsSchema)) group: GroupsDto,
  ) {
    switch (group) {
      case 'machine':
        return { data: await this.DashboardService.getKwhByMachines() };

      case 'factory':
        return { data: await this.DashboardService.getKwhByFactories() };

      case 'month':
      default:
        return { data: await this.DashboardService.getKwhByMonth() };
    }
  }
}
