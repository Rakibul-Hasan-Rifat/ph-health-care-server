import userServices from "./user.service";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

// Get all users controller
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.getAllUsers({
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        search: req.query.search as string,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as string
    })
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Users retrieved successfully!",
        data: result
    })
})

// Get all doctors controller
const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.getAllDoctors()
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Doctors retrieved successfully!",
        data: result
    })
})

// Get all patients controller
const getAllPatients = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.getAllPatients()
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Patients retrieved successfully!",
        data: result
    })
})

// Get all admins controller
const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.getAllAdmins()
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Admins retrieved successfully!",
        data: result
    })
})

// Create patient controller
const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.createPatient(req.body)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User as patient is registered successfully!",
        data: result
    })
})

// Create doctor controller
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

// Create admin controller
const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.createAdmin(req.body);
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User as admin is registered successfully!",
        data: result
    })
})

const userControllers = {
    createPatient, createDoctor, createAdmin,
    getAllUsers, getAllDoctors, getAllPatients, getAllAdmins
}

export default userControllers