import express from "express";
import userControllers from "./user.controller";

const userRouter = express.Router();

userRouter.post('/create-patient', userControllers.createPatient)

export default userRouter;