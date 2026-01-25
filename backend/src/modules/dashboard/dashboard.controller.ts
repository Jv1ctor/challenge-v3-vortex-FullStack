import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { GroupsSchema, type GroupsDto } from './dtos/groups.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { PlatformSelect } from 'src/common/decorators/platform.decorator';
import { Platform } from 'src/common/enums/platform.enum';
import { FactoriesService } from '../factories/factories.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly factoriesService: FactoriesService,
  ) {}

  @Get('consumption')
  @Roles(Role.Admin, Role.Manager)
  @PlatformSelect(Platform.Web)
  async consupmtionDashboard(
    @Query('groupBy', new ZodValidationPipe(GroupsSchema)) group: GroupsDto,
    @Query('factoryId') factoryId?: string,
    @Query('year') year?: string,
  ) {
    const factoryIdNum = factoryId ? Number(factoryId) : undefined;
    const yearNum = year ? Number(year) : undefined;
    switch (group) {
      case 'machine':
        return { data: await this.dashboardService.getKwhByMachinesAll() };

      case 'factory':
        return { data: await this.dashboardService.getKwhByFactoriesAll() };

      case 'month':
        if (factoryIdNum) {
          const factory =
            await this.factoriesService.getFactoryInfo(factoryIdNum);
          return {
            id: factory.id,
            name: factory.name,
            data: await this.dashboardService.getKwhMonthByFactory(
              factoryIdNum,
              yearNum,
            ),
          };
        }

        break;
      default:
        return { data: await this.dashboardService.getKwhByMonth() };
    }
  }
}
