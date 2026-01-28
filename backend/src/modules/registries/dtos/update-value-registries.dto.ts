import z from 'zod';

export const UpdateValueRegistriesSchema = z.object({
  value: z.float32().max(10000).nonnegative().nonoptional(),
});

export type UpdateValueRegistriesDto = z.infer<
  typeof UpdateValueRegistriesSchema
>;
