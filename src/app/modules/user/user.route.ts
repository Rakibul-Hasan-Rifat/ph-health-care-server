import { NextFunction, Request, Response, Router } from "express";
import { uploadMulter } from "../../utils/fileUpload";
import userControllers from "./user.controller";
import userValidation from "./user.validation";
import validateSchema from "../../middlewares/validateRequest";
import userZodSchema from "./user.validation";
import { uploadImageToCloudinary } from "../../middlewares/uploadImage";

const userRouter = Router();

userRouter.post(
    "/create-patient",
    uploadMulter.single("file"),
    validateSchema(userZodSchema.createUserZodSchema),
    uploadImageToCloudinary(),
    userControllers.createPatient)

export default userRouter;