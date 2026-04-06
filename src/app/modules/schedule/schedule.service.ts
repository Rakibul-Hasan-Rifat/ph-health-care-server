import { addHours, addMinutes, format } from "date-fns";
import { IScheduleData } from "./schedule.interface";

const createSchedule = (payload: IScheduleData) => {

    const { date, time } = payload;

    const intervalTime = 30;

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
        }
    }

    return {
        payload
    }
};

const scheduleService = {
    createSchedule
}

export default scheduleService;