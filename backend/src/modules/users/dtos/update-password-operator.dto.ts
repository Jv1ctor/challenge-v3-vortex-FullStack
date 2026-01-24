import z from 'zod';

export const UpdatePasswordSchema = z
  .object({
    user_id: z.uuid().nonempty().nonoptional(),
    password: z.string().min(8).nonempty().nonoptional(),
  })
  .required();

export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;
