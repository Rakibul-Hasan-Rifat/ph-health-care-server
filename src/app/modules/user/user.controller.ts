import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import userServices from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    // const result = await userServices.createPatient(req.body);
    console.log('user-controllter: file checking', req?.file);
    console.log('user-controllter: text', JSON.parse(req?.body?.data));

    res.send({file: req.file, data: JSON.parse(req.body.data)})

    // sendResponse(res, {
    //     success: true,
    //     statusCode: 201,
    //     data: result,
    //     message: "Patient is created successfully."
    // })
})

const userControllers = { createPatient }

export default userControllers