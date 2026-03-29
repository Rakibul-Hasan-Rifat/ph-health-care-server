import bcrypt from "bcryptjs";
import config from "../../../config";
import envConfig from "../../../config";
import prisma from "../../shared/prisma";
import { Gender, UserRole } from "../../../../prisma/generated/prisma/enums";
import { AdminInterface, DoctorInterface, PatientInterface } from "./user.interface";

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

const createDoctor = async (payload: DoctorInterface) => {
    const hashedPassword = await bcrypt.hash(payload.password, Number(envConfig.bcrypt_salt))
    const result = await prisma.$transaction(async (ts) => {

        const userCreationResult = await ts.user.create({
            data: {
                email: payload.doctor.email,
                password: hashedPassword,
                role: UserRole.DOCTOR
            },
            omit: {
                password: true
            }
        })

        const doctorCreationResult = await ts.doctor.create({
            data: {
                name: payload.doctor.name,
                email: payload.doctor.email,
                address: payload.doctor.address,
                experience: payload.doctor.experience,
                designation: payload.doctor.designation,
                profilePhoto: payload.doctor.profilePhoto,
                qualification: payload.doctor.qualification,
                contactNumber: payload.doctor.contactNumber,
                appointmentFee: payload.doctor.appointmentFee,
                registrationNumber: payload.doctor.registrationNumber,
                currentWorkingPlace: payload.doctor.currentWorkingPlace,
                gender: Gender[payload.doctor.gender as keyof typeof Gender],
            }
        })

        return { user: userCreationResult, doctor: doctorCreationResult }
    })

    return result;
}

const createAdmin = async (payload: AdminInterface) => {
    const hashedPassword = await bcrypt.hash(payload.password, Number(envConfig.bcrypt_salt))

    console.log({ ...payload, password: hashedPassword });

    const result = await prisma.$transaction(async (ts) => {
        const userCreationResult = await ts.user.create({
            data: {
                email: payload.admin.email,
                password: hashedPassword,
                role: UserRole.ADMIN
            },
            omit: {
                password: true
            }
        })
        const adminCreationResult = await ts.admin.create({
            data: {
                name: payload.admin.name,
                email: payload.admin.email,
                address: payload.admin.address,
                profilePhoto: payload.admin.profilePhoto,
                contactNumber: payload.admin.contactNumber
            }
        })
        return { user: userCreationResult, admin: adminCreationResult }
    })
    return result;
}

const userServices = { createPatient, createDoctor, createAdmin }

export default userServices;