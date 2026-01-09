import z from "zod";


export const SignInRequestSchema = z.object({
  username: z.string().max(200).min(4).nonempty().nonoptional(),
  password: z.string().nonempty().nonoptional()
})

export type SignInRequestDto = z.infer<typeof SignInRequestSchema>