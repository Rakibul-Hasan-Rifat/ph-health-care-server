import { NextFunction, Request, Response } from "express";
import { uploadToCloudinary } from "../utils/fileUpload";

export const uploadImageToCloudinary = () => async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        req.body.patient.profilePhoto = await uploadToCloudinary(req.file)
    }

    next()
}