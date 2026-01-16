import z from "zod";



export const CreateFactoryReqSchema = z.object({
  name: z.string().max(225).nonempty().nonoptional(),
  address: z.string().max(225).optional(),
  city: z.string().max(225).optional(),
  country: z.string().max(225).optional(),
})

export type CreateFactoryReqDto = z.infer<typeof CreateFactoryReqSchema>