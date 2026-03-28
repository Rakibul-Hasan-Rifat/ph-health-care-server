import { Router } from "express";
import userZodSchema from "./user.validation";
import userControllers from "./user.controller";
import { multerUploader } from "../../utils/multer";
import { uploadMulter } from "../../utils/fileUpload";
import imageUploader from "../../middlewares/imageUploader";
import validateSchema from "../../middlewares/validateRequest";
import { uploadImageToCloudinary } from "../../middlewares/uploadImage";

const userRouter = Router();

userRouter.post(
    "/create-patient",
    uploadMulter.single("file"),
    validateSchema(userZodSchema.createPatientZodSchema),
    uploadImageToCloudinary(),
    userControllers.createPatient
)

userRouter.post(
    "/create-doctor",
    multerUploader.single("file"),
    validateSchema(userZodSchema.createDoctorZodSchema),
    imageUploader(),
    userControllers.createDoctor
)

export default userRouter;