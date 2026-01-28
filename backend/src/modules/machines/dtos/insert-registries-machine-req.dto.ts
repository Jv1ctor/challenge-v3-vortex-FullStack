import z from 'zod';

export const InsertRegistriesByMachineSchema = z.object({
  value: z.float32().max(10000).nonnegative().nonoptional(),
});

export type InsertRegistriesByMachineDto = z.infer<
  typeof InsertRegistriesByMachineSchema
>;
