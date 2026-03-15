import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import userServices from "./user.service";
import sendResponse from "../../shared/sendResponse";
import { uploadToCloudinary } from "../../utils/fileUpload";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    // const result = await userServices.createPatient(req.body, req.file);

    // sendResponse(res, {
    //     success: true,
    //     statusCode: 201,
    //     data: result,
    //     message: "Patient is created successfully."
    // })
    const result = await uploadToCloudinary()

    res.send({'image saved': result})
})

const userControllers = { createPatient }

export default userControllers