import { z } from "zod"

export const machineSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  model: z
    .string()
    .min(1, "Modelo é obrigatório")
    .min(2, "Modelo deve ter no mínimo 2 caracteres")
    .max(100, "Modelo deve ter no máximo 100 caracteres"),
  manufacturer: z
    .string()
    .min(1, "Fabricante é obrigatório")
    .min(2, "Fabricante deve ter no mínimo 2 caracteres")
    .max(100, "Fabricante deve ter no máximo 100 caracteres"),
  description: z.string(),
})

export type MachineFormData = z.infer<typeof machineSchema>
