import { NextFunction, Request, Response } from "express";
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

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.createDoctor(req.body)
    console.log(result);
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User as doctor is registered successfully!",
        data: result
    })
})

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.createAdmin(req.body);
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User as admin is registered successfully!",
        data: result
    })
})

const userControllers = { createPatient, createDoctor, createAdmin }

export default userControllers