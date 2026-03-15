import express, { NextFunction, Request, Response } from "express";
import userControllers from "./user.controller";
import { uploadMulter } from "../../utils/fileUpload";
import validateSchema from "../../middlewares/validateRequest";
import userValidation from "./user.validation";

const userRouter = express.Router();

userRouter.post(
    '/create-patient',
    uploadMulter.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.userCreationValidation.parse(req.body.data);

        return userControllers.createPatient(req, res, next)
    },
)

export default userRouter;