import bcrypt from "bcryptjs";
import config from "../../../config";
import envConfig from "../../../config";
import prisma from "../../shared/prisma";
import { searchableFields } from "./user.constant";
import calculatePagination from "../../utils/pagination";
import { Prisma } from "../../../../prisma/generated/prisma/client";
import { Gender, UserRole } from "../../../../prisma/generated/prisma/enums";
import { AdminInterface, DoctorInterface, PatientInterface } from "./user.interface";

type TOptions = {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
}

type TFilters = {}

// Get all users service
const getAllUsers = async (
    { options, filters }: { options: TOptions, filters: Record<string, unknown> }
) => {

    const { page, limit: take, skip, sortBy, sortOrder } = calculatePagination(options)
    const { searchTerm, ...filtersData } = filters;

    let andConditions: Prisma.UserWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: searchableFields.map(field => ({
                [field]: {
                    contains: searchTerm
                }
            }))
        })
    }

    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key]
                }
            }))
        })
    }

    const where: Prisma.UserWhereInput = andConditions ? { AND: andConditions } : {}

    const response = await prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: {
            [sortBy]: sortOrder
        }
    })

    const total = await prisma.user.count({ where })

    return {
        data: response,
        meta: {
            page,
            limit: take,
            total
        }
    };
}

// Get all doctors service
const getAllDoctors = async () => {
    const response = await prisma.user.findMany({
        where: {
            role: UserRole.DOCTOR
        },
        select: {
            id: true,
            email: true,
            role: true,
            doctor: {
                select: {
                    name: true,
                    email: true,
                    address: true
                }
            }
        }
    })
    return response;
}

// Get all patients service
const getAllPatients = async () => {
    const response = await prisma.user.findMany({
        where: {
            role: UserRole.PATIENT
        },
        select: {
            id: true,
            email: true,
            role: true,
            patient: {
                select: {
                    name: true,
                    email: true,
                    contactNumber: true
                }
            }
        }
    })
    return response;
}

// Get all admins service
const getAllAdmins = async () => {
    const response = await prisma.user.findMany({
        where: {
            role: UserRole.ADMIN
        },
        select: {
            id: true,
            email: true,
            role: true,
            admin: {
                select: {
                    name: true,
                    email: true,
                    address: true
                }
            }
        }
    })
    return response;
}

// Create patient service
const createPatient = async (payload: PatientInterface) => {

    const hashedPassword = await bcrypt.hash(payload.password, Number(config.bcrypt_salt));
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

// Create doctor service
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

// Create admin service
const createAdmin = async (payload: AdminInterface) => {
    const hashedPassword = await bcrypt.hash(payload.password, Number(envConfig.bcrypt_salt))
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

const userServices = {
    createPatient, createDoctor, createAdmin,
    getAllUsers, getAllDoctors, getAllPatients, getAllAdmins
}

export default userServices;