import z from 'zod';

export const CreateUserOperatorSchema = z
  .object({
    username: z
      .string()
      .max(50)
      .min(4)
      .nonempty()
      .trim()
      .normalize('NFC')
      .toLowerCase()
      .regex(/^[\p{L}\p{N}._-]+$/u, 'invalid characters')
      .nonoptional(),
    password: z.string().nonempty().nonoptional(),
  })
  .required();

export type CreateUserOperatorDto = z.infer<typeof CreateUserOperatorSchema>;
