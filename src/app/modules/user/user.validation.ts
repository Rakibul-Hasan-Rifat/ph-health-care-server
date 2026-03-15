import z, { email } from "zod";

const userCreationValidation = z.object({
    password: z.string({ error: "Password is a required field." }),
    patient: z.object({
        name: z.string({ error: "Name must be given." }),
        email: z.email({ error: "Email must be provided." }),
        address: z.string().optional()
    })
})

const userValidation = {
    userCreationValidation
}

export default userValidation;