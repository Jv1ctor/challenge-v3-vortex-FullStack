import { applyDecorators, UsePipes } from '@nestjs/common';
import z from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

export const ZodValidation = (schema: z.ZodObject) =>
  applyDecorators(UsePipes(new ZodValidationPipe(schema)));
