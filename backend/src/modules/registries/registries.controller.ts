import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  type UpdateValueRegistriesDto,
  UpdateValueRegistriesSchema,
} from './dtos/update-value-registries.dto';
import { RegistriesService } from './registries.service';

@Controller('registries')
export class RegistriesController {
  constructor(private readonly registriesService: RegistriesService) {}

  @Patch('/:id')
  @Roles(Role.Admin, Role.Manager)
  async updateValueRegistry(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(UpdateValueRegistriesSchema))
    body: UpdateValueRegistriesDto,
  ) {
    await this.registriesService.updateValueRegistry(id, body.value);
  }
}
