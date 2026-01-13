import z from 'zod';

export const CreateMachineReqSchema = z.object({
  name: z.string().nonempty().nonoptional(),
  model: z.string().nonempty().optional(),
  manufacture: z.string().nonempty().optional(),
  description: z.string().nonempty().optional(),
});

export type CreateMachineReqDto = z.infer<typeof CreateMachineReqSchema>;
