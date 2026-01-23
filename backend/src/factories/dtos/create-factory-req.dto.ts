import z from 'zod';

export const CreateFactoryReqSchema = z.object({
  name: z
    .string()
    .max(225)
    .nonempty()
    .toLowerCase()
    .normalize('NFC')
    .trim()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\.,&\/\(\)]+$/, 'invalid characters')
    .nonoptional(),
  address: z
    .string()
    .max(225)
    .trim()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\.,ºª°\/]+$/, 'invalid characters')
    .optional(),
  city: z
    .string()
    .max(225)
    .trim()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s\-']+$/, 'invalid characters')
    .optional(),
  country: z
    .string()
    .max(225)
    .trim()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s\-]+$/, 'invalid characters')
    .optional(),
});

export type CreateFactoryReqDto = z.infer<typeof CreateFactoryReqSchema>;
