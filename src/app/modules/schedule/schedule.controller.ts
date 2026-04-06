import { Request, Response } from "express";
import scheduleService from "./schedule.service";

const createSchedule = async (req: Request, res: Response) => {

    const result = scheduleService.createSchedule(req.body)

    return res.status(200).json({
        data: result
    })
}

const scheduleController = {
    createSchedule
}

export default scheduleController;
