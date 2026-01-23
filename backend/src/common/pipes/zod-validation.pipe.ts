import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import z, { ZodError } from 'zod';

type GroupedZodError = {
  field: string;
  errors: string[];
};

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodObject | z.ZodEnum) {}

  private getZodMessageError(zodError: ZodError) {
    const zodErrorsList = zodError.issues.map((issue) => ({
      field: issue.path[0],
      error: issue.message,
    }));
    const groupedZodError = zodErrorsList.reduce<GroupedZodError[]>(
      (acc, it) => {
        const existing = acc.find((e) => e.field === it.field);

        if (existing) {
          existing.errors.push(it.error);
        } else {
          acc.push({ field: it.field.toString(), errors: [it.error] });
        }

        return acc;
      },
      [] as GroupedZodError[],
    );
    return groupedZodError;
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
          description: 'Error Validation',
        });
      }
    }
  }
}
