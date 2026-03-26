import z from "zod";

const createUserZodSchema = z.object({
    password: z.string(),
    patient: z.object({
        name: z.string(),
        email: z.email(),
        contactNumber: z.string(),
        address: z.string().optional()
    })
})

const userZodSchema = {
    createUserZodSchema
}

export default userZodSchema;