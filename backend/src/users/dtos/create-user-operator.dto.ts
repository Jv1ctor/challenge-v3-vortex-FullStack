import z from "zod"



export const CreateUserOperatorSchema = z.object({
  username: z.string().max(200).min(4).nonempty().nonoptional(),
  password: z.string().nonempty().nonoptional()
}).required()

export type CreateUserOperatorDto = z.infer<typeof CreateUserOperatorSchema>