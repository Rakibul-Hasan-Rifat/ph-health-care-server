import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import userServices from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.createPatient(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        data: result,
        message: "Patient is created successfully."
    })
})

const userControllers = { createPatient }

export default userControllers