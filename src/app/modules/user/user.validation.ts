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
        contactNumber: z.string(),
        address: z.string().optional(),
        registrationNumber: z.string(),
        gender: z.string(),
        appointmentFee: z.number(),
        qualification: z.string(),
        currentWorkingPlace: z.string(),
        designation: z.string()
    })
})

const userZodSchema = {
    createPatientZodSchema,
    createDoctorZodSchema
}

export default userZodSchema;