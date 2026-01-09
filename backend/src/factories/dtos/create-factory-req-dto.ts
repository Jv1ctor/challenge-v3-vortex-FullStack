import z from "zod";



export const CreateFactoryReqSchema = z.object({
  name: z.string().max(225).nonempty().nonoptional()
})

export type CreateFactoryReqDto = z.infer<typeof CreateFactoryReqSchema>