import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import z, { ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodObject | z.ZodEnum) {}

  private getZodMessageError(zodError: ZodError) {
    console.log(zodError);
    return zodError.issues.map((issue) => ({
      fied: issue.path[0],
      error: issue.message,
    }));
  }

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        const messageError = this.getZodMessageError(error);

        throw new BadRequestException(messageError, {
          cause: error,
          description: 'Validation failed',
        });
      }
    }
  }
}
