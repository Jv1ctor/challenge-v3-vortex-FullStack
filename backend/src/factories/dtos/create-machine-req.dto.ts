import z from 'zod';

const SAFE_TEXT = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\.,()]+$/;
export const CreateMachineReqSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(60)
    .toLowerCase()
    .normalize('NFC')
    .regex(SAFE_TEXT, 'invalid character'),

  model: z
    .string()
    .trim()
    .min(2)
    .max(60)
    .regex(SAFE_TEXT, 'invalid character')
    .optional(),

  manufacturer: z
    .string()
    .trim()
    .min(2)
    .max(60)
    .regex(SAFE_TEXT, 'invalid character')
    .optional(),

  description: z.string().trim().max(300).optional(),
});

export type CreateMachineReqDto = z.infer<typeof CreateMachineReqSchema>;
