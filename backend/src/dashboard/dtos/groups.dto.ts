import z from "zod"



export const GroupsSchema = z.enum(["month", "machine", "factory"])

export type GroupsDto = z.infer<typeof GroupsSchema>