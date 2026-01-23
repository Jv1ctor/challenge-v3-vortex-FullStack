import { ErrorMessage } from 'src/common/enums/error-message.enum';
import z from 'zod';

export const UpdateFactorySchema = z.object({
  name: z
    .string()
    .max(225)
    .nonempty()
    .toLowerCase()
    .normalize('NFC')
    .trim()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\.,&\/\(\)]+$/, ErrorMessage.FIELD_INVALID)
    .nonoptional(),
  address: z
    .string()
    .max(225)
    .trim()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\.,ºª°\/]+$/, ErrorMessage.FIELD_INVALID)
    .optional(),
  city: z
    .string()
    .max(225)
    .trim()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s\-']+$/, ErrorMessage.FIELD_INVALID)
    .optional(),
  country: z
    .string()
    .max(225)
    .trim()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s\-]+$/, ErrorMessage.FIELD_INVALID)
    .optional(),
});

export type UpdateFactoryDto = z.infer<typeof UpdateFactorySchema>;
