import { Router } from "express";
import authorize from "../../middlewares/authorize";
import doctorScheduleController from "./doctorSchedule.controller";
import { UserRole } from "../../../../prisma/generated/prisma/enums";

const doctorScheduleRouter = Router();

doctorScheduleRouter.get("/", authorize(UserRole.DOCTOR), doctorScheduleController.getDoctorSchedule);
doctorScheduleRouter.post("/create-schedule", authorize(UserRole.DOCTOR), doctorScheduleController.createDoctorSchedule);

export default doctorScheduleRouter;