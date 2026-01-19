import z from 'zod';

const SAFE_TEXT = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\.,()]+$/;

export const UpdatedMachineSchema = z.object({
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

  manufacture: z
    .string()
    .trim()
    .min(2)
    .max(60)
    .regex(SAFE_TEXT, 'invalid character')
    .optional(),

  description: z
    .string()
    .trim()
    .min(3)
    .max(300)
    // descrição pode ser um pouco mais livre
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\.,()\/]+$/, 'invalid character')
    .optional(),
});

export type UpdatedMachineDto = z.infer<typeof UpdatedMachineSchema>;
