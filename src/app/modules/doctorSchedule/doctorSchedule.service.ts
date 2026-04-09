import prisma from "../../shared/prisma";
import { TJWTUser } from "../../types";

const createDoctorSchedule = async (payload: { scheduleIds: string[] }, user: TJWTUser) => {

    const { email } = user;

    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            email
        }
    })

    const doctorScheduleData = payload.scheduleIds.map(scheduleId => ({
        doctorId: doctorData.id,
        scheduleId: scheduleId,
    }))

    const result = await prisma.doctorSchedule.createMany({
        data: doctorScheduleData
    })

    return result;
}

const getDoctorSchedule = async () => {

    const result = await prisma.doctorSchedule.findMany()

    return result;
}

const doctorSchedules = { createDoctorSchedule, getDoctorSchedule }

export default doctorSchedules;