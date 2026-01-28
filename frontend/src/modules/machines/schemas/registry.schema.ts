import { z } from "zod"

export const registrySchema = z.object({
  value: z
    .number({ message: "Valor deve ser um número" })
    .nonnegative("Valor deve ser positivo ou zero")
    .min(0.01, "Valor deve ser maior que zero")
    .max(10000, "Valor deve ser menor que 10000"),
})

export type RegistryFormData = z.infer<typeof registrySchema>
