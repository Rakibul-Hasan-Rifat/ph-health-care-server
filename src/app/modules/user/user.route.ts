import { NextFunction, Request, Response, Router } from "express";
import { uploadMulter } from "../../utils/fileUpload";
import userControllers from "./user.controller";
import userValidation from "./user.validation";

const userRouter = Router();

userRouter.post(
    "/create-patient",
    uploadMulter.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = userValidation.userCreationValidation.parse(JSON.parse(req.body.data))
            next()
        } catch (error) {
            next(error)
        }
    },
    userControllers.createPatient)

export default userRouter;