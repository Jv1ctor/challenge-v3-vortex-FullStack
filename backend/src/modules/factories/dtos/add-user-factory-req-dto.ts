import z from 'zod';

export const AddUserFactoryReqSchema = z.object({
  user_id: z.uuid().nonempty().nonoptional(),
});

export type AddUserFactoryReqDto = z.infer<typeof AddUserFactoryReqSchema>;
