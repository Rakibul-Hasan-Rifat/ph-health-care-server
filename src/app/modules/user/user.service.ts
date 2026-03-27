import bcrypt from "bcryptjs";
import { UserInterface } from "./user.interface";
import config from "../../../config";
import prisma from "../../shared/prisma";

const createPatient = async (payload: UserInterface) => {
    
    const hashedPassword = await bcrypt.hash(payload.password, Number(config.bcrypt_salt))
    
    const result = await prisma.$transaction(async (ts) => {
        const userCreationResult = await ts.user.create({
            data: {
                email: payload.patient.email,
                password: hashedPassword
            },
            omit: {
                password: true
            }
        })

        const patientCreationResult = await ts.patient.create({
            data: payload.patient
        })

        return { user: userCreationResult, patient: patientCreationResult }
    })

    return result;
}

const userServices = { createPatient }

export default userServices;