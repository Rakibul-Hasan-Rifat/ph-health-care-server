import bcrypt from "bcryptjs";
import config from "../../../config";
import prisma from "../../shared/prisma";
import { DoctorInterface, PatientInterface } from "./user.interface";

const createPatient = async (payload: PatientInterface) => {
    
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

const createDoctor = (payload: DoctorInterface) => {
    console.log(payload);
    return payload
}

const userServices = { createPatient, createDoctor }

export default userServices;