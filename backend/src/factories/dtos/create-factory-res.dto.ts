import z from "zod"

export const CreateFactoryResSchema = z.object({
  id: z.number().nonnegative().nonoptional(),
})

export type CreateFactoryResDto = z.infer<typeof CreateFactoryResSchema>