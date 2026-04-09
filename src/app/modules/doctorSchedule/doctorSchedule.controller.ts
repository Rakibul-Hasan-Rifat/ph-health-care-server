import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import doctorSchedules from "./doctorSchedule.service";

const createDoctorSchedule = catchAsync(async (req: Request & { user?: any }, res: Response) => {

    const result = await doctorSchedules.createDoctorSchedule(req.body, req.user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor schedule created successfully",
        data: result
    })
})

const getDoctorSchedule = catchAsync(async (req: Request & { user?: any }, res: Response) => {

    const result = await doctorSchedules.getDoctorSchedule();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor schedule created successfully",
        data: result
    })
})

const doctorScheduleController = {
    getDoctorSchedule,
    createDoctorSchedule
}

export default doctorScheduleController;