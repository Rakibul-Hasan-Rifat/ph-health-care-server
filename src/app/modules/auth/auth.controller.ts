import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import authServices from "./auth.service";
import sendResponse from "../../shared/sendResponse";

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await authServices.loginService(req.body);

    res.cookie("accessToken", result.accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60
    })

    res.cookie("refreshToken", result.refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 90
    })

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Login successful",
        data: {
            needPasswordChange: result.needPasswordChange
        }
    })
})

const authControllers = { login }

export default authControllers;