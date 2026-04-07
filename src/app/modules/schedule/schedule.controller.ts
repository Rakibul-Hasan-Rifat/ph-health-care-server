import { Request, Response } from "express";
import scheduleService from "./schedule.service";
import sendResponse from "../../shared/sendResponse";
import pickFields from "../../utils/pick";
import catchAsync from "../../shared/catchAsync";

const createSchedule = async (req: Request, res: Response) => {

    const result = await scheduleService.createSchedule(req.body);

    sendResponse(res, {
        data: result,
        success: true,
        statusCode: 201,
        message: 'Schedule created successfully',
    })
}

const getSchedules = async (req: Request, res: Response) => {

    const options = pickFields(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const filters = pickFields(req.query, ['startDateTime', 'endDateTime']);

    const response = await scheduleService.getSchedules(options, filters);


    sendResponse(res, {
        success: true,
        statusCode: 200,
        data: response.data,
        meta: response.meta,
        message: 'Schedules retrieved successfully'
    });
};

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {

    await scheduleService.deleteSchedule(req.params.scheduleId as string);

    sendResponse(res, {
        data: null,
        success: true,
        statusCode: 200,
        message: 'Schedule deleted successfully'
    })
})

const scheduleController = {
    getSchedules,
    createSchedule,
    deleteSchedule
}

export default scheduleController;
