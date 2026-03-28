import { NextFunction, Request, Response } from "express";
import { cloudinaryUploader } from "../utils/cloudinary";

const imageUploader = () => async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        req.body.doctor.profilePhoto = await cloudinaryUploader(req.file)
    }
    next();
}

export default imageUploader;