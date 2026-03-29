import z from "zod";

const createPatientZodSchema = z.object({
    password: z.string(),
    patient: z.object({
        name: z.string(),
        email: z.email(),
        contactNumber: z.string(),
        address: z.string().optional()
    })
})

const createDoctorZodSchema = z.object({
    password: z.string(),
    doctor: z.object({
        name: z.string(),
        email: z.email(),
        role: z.string(),
        gender: z.string(),
        designation: z.string(),
        contactNumber: z.string(),
        qualification: z.string(),
        appointmentFee: z.number(),
        address: z.string().optional(),
        registrationNumber: z.string(),
        currentWorkingPlace: z.string()
    })
})

const createAdminZodSchema = z.object({
    password: z.string(),
    admin: z.object({
        name: z.string(),
        role: z.string(),
        email: z.email(),
        contactNumber: z.string(),
        address: z.string().optional()
    })
})

const userZodSchema = {
    createAdminZodSchema,
    createDoctorZodSchema,
    createPatientZodSchema
}

export default userZodSchema;