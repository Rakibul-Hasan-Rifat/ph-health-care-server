import z, { email } from "zod";

const userCreationValidation = z.object({
    password: z.string(),
    patient: z.object({
        name: z.string(),
        email: z.email(),
        address: z.string().optional()
    })
})

const userValidation = {
    userCreationValidation
}

export default userValidation;