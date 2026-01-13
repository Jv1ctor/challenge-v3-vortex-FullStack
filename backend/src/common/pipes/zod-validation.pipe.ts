import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import z, { ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodObject | z.ZodEnum) {}

  private getZodMessageError(zodError: ZodError): string[] {
    return zodError.issues.map((issue) => issue.message);
  }

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      let messageError: string[] = [];
      if (error instanceof ZodError)
        messageError = this.getZodMessageError(error);

      throw new BadRequestException(messageError, {
        cause: error,
        description: 'Validation failed',
      });
    }
  }
}
