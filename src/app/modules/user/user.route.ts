import { Router } from "express";
import userZodSchema from "./user.validation";
import userControllers from "./user.controller";
import { multerUploader } from "../../utils/multer";
import { uploadMulter } from "../../utils/fileUpload";
import imageUploader from "../../middlewares/imageUploader";
import validateSchema from "../../middlewares/validateRequest";
import { uploadImageToCloudinary } from "../../middlewares/uploadImage";

const userRouter = Router();

// Get all users route
userRouter.get("/", userControllers.getAllUsers)

// Get all doctors route
userRouter.get("/doctors", userControllers.getAllDoctors)

// Get all patients route
userRouter.get("/patients", userControllers.getAllPatients)

// Get all admins route
userRouter.get("/admins", userControllers.getAllAdmins)

// Create patient route
userRouter.post(
    "/create-patient",
    uploadMulter.single("file"),
    validateSchema(userZodSchema.createPatientZodSchema),
    uploadImageToCloudinary(),
    userControllers.createPatient
)

// Create doctor route
userRouter.post(
    "/create-doctor",
    multerUploader.single("file"),
    validateSchema(userZodSchema.createDoctorZodSchema),
    imageUploader("doctor"),
    userControllers.createDoctor
)

// Create admin route
userRouter.post(
    "/create-admin",
    multerUploader.single("file"),
    validateSchema(userZodSchema.createAdminZodSchema),
    imageUploader("admin"),
    userControllers.createAdmin
)

export default userRouter;