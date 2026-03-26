import bcrypt from "bcryptjs";
import { UserInterface } from "./user.interface";
import config from "../../../config";
import prisma from "../../shared/prisma";

const createPatient = async (payload: UserInterface) => {

    console.log('starting of createPatientService');
    
    const hashedPassword = await bcrypt.hash(payload.password, Number(config.bcrypt_salt))
    console.log('after hashing password in createPatientService', hashedPassword);
    
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
        console.log('after creating user with password and email in createPatientService');

        const patientCreationResult = await ts.patient.create({
            data: payload.patient
        })

        return { user: userCreationResult, patient: patientCreationResult }
    })

    console.log('immediately before user create service', result);

    return result;
}

const userServices = { createPatient }

export default userServices;