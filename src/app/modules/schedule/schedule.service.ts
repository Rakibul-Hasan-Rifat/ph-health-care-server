import prisma from "../../shared/prisma";
import { IScheduleData } from "./schedule.interface";
import { addHours, addMinutes, format } from "date-fns";
import calculatePagination from "../../utils/pagination";
import { Schedule } from "../../../../prisma/generated/prisma/browser";
import { ScheduleWhereInput } from "../../../../prisma/generated/prisma/models";

const createSchedule = async (payload: IScheduleData) => {

    const { date, time } = payload;
    const intervalTime = 30;
    let schedules: Schedule[] = [];

    const startDate = new Date(date.start);
    const endDate = new Date(date.end);
    const startTime = time.start;
    const endTime = time.end;

    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');

    console.log(formattedStartDate, formattedEndDate);
    // console.log(formattedStartDateTime, formattedEndDateTime);

    for (let date = formattedStartDate; date <= formattedEndDate; date = format(addHours(new Date(date), 24), 'yyyy-MM-dd')) {
        console.log('looping', date, formattedEndDate);

        const formattedStartDateTime = addMinutes(
            addHours(
                date,
                Number(startTime.split(":")[0])
            ),
            Number(startTime.split(":")[1])
        );
        const formattedEndDateTime = addMinutes(
            addHours(
                date,
                Number(endTime.split(":")[0])
            ),
            Number(endTime.split(":")[1])
        );

        for (let time = formattedStartDateTime; time <= formattedEndDateTime; time = addMinutes(time, intervalTime)) {
            console.log('looping time', time, formattedEndDateTime);
            const slotStartDateTime = time;
            const slotEndDateTime = addMinutes(slotStartDateTime, intervalTime);

            const slotDateTime = {
                startTime: slotStartDateTime,
                endTime: slotEndDateTime
            }

            const doesScheduleExist = await prisma.schedule.findFirst({
                where: slotDateTime
            })

            if (doesScheduleExist) {
                throw new Error(`Schedule already exists for ${format(slotStartDateTime, 'yyyy-MM-dd HH:mm')} - ${format(slotEndDateTime, 'yyyy-MM-dd HH:mm')}`);
            }

            const createdSchedule = await prisma.schedule.create({
                data: slotDateTime
            })

            schedules.push(createdSchedule)
        }
    }

    return schedules;
};

const getSchedules = async (options: TOptions, filters: TFilters) => {

    const { page, take, skip, sortBy, sortOrder } = calculatePagination(options)
    const { startDateTime, endDateTime } = filters;

    let andConditions: ScheduleWhereInput[] = [];

    if (startDateTime && endDateTime) {
        andConditions.push({
            AND: [
                {
                    startTime: {
                        gte: (typeof startDateTime === 'string' || typeof startDateTime === 'number')
                            ? new Date(startDateTime)
                            : undefined
                    }
                },
                {
                    endTime: {
                        lte: (typeof endDateTime === 'string' || typeof endDateTime === 'number')
                            ? new Date(endDateTime)
                            : undefined
                    }
                }
            ]
        })
    }

    const schedules = await prisma.schedule.findMany(
        {
            where: andConditions.length > 0 ? { AND: andConditions } : {},
            take,
            skip,
            orderBy: {
                [sortBy]: sortOrder
            }
        }
    );

    const total = await prisma.schedule.count({ where: andConditions.length > 0 ? { AND: andConditions } : {} });

    return {
        data: schedules, meta: {
            page,
            total,
            limit: take
        }
    };
}

const deleteSchedule = async (scheduleId: string) => {
    await prisma.schedule.delete({
        where: {
            id: scheduleId
        }
    })
}

const scheduleService = {
    getSchedules,
    createSchedule,
    deleteSchedule
}

export default scheduleService;