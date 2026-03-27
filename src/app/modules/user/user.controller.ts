import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import userServices from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.createPatient(req.body)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User as patient is registered successfully!",
        data: result
    })
})

const userControllers = { createPatient }

export default userControllers