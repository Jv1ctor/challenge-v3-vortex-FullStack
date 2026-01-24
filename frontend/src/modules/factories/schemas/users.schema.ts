import z from "zod"


export const userSchema = z.object({
  username: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(7, "Nome deve ter no mínimo 7 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  password: z
    .string()
    .min(1, "Senha é obrigatório")
    .min(8, "Senha deve ter no mínimo 8 caracteres")
})

export type UserFormData = z.infer<typeof userSchema>
