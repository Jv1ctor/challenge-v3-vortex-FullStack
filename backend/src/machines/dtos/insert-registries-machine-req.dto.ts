import z from 'zod';

export const InsertRegistriesByMachineSchema = z.object({
  user_id: z.uuid().nonempty().nonoptional(),
  value: z.float32().nonnegative().nonoptional(),
});

export type InsertRegistriesByMachineDto = z.infer<
  typeof InsertRegistriesByMachineSchema
>;
