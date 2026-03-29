import { NextFunction, Request, Response } from "express";
import { cloudinaryUploader } from "../utils/cloudinary";

const imageUploader = (userType: "patient" | "doctor" | "admin" = "patient") => async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        req.body[userType].profilePhoto = await cloudinaryUploader(req.file)
    }
    next();
}

export default imageUploader;