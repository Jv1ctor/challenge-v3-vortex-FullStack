import z from "zod";


export const RegisterUserReqSchema = z.object({
  user_id: z.uuid().nonempty().nonoptional()
})

export type RegisterUserReqDto = z.infer<typeof RegisterUserReqSchema>