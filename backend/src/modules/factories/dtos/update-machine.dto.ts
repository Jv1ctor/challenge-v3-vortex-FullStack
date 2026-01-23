import { ErrorMessage } from 'src/common/enums/error-message.enum';
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
    .regex(SAFE_TEXT, ErrorMessage.FIELD_INVALID),

  model: z
    .string()
    .trim()
    .min(2)
    .max(60)
    .regex(SAFE_TEXT, ErrorMessage.FIELD_INVALID)
    .optional(),

  manufacturer: z
    .string()
    .trim()
    .min(2)
    .max(60)
    .regex(SAFE_TEXT, ErrorMessage.FIELD_INVALID)
    .optional(),

  description: z.string().trim().max(300).optional(),
});

export type UpdatedMachineDto = z.infer<typeof UpdatedMachineSchema>;
