import { z } from "zod"

export const factorySchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(60, "Nome deve ter no máximo 60 caracteres"),
  country: z
    .string()
    .min(1, "País é obrigatório")
    .min(2, "País deve ter no mínimo 2 caracteres")
    .max(100, "País deve ter no máximo 100 caracteres"),
  address: z
    .string()
    .min(1, "Endereço é obrigatório")
    .min(5, "Endereço deve ter no mínimo 5 caracteres")
    .max(255, "Endereço deve ter no máximo 255 caracteres"),
  city: z
    .string()
    .min(1, "Cidade é obrigatória")
    .min(2, "Cidade deve ter no mínimo 2 caracteres")
    .max(60, "Cidade deve ter no máximo 60 caracteres"),
})

export type FactoryFormData = z.infer<typeof factorySchema>
