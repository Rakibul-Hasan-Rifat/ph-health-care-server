import z from "zod";

export const loginUserZodeSchema = z.object({
    email: z.string(),
    password: z.string()
})