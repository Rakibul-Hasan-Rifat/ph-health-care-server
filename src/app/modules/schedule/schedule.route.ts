import { Router } from "express";
import scheduleController from "./schedule.controller";

const scheduleRouter = Router();

scheduleRouter.get("/", scheduleController.getSchedules)
scheduleRouter.post("/create-schedule", scheduleController.createSchedule)
scheduleRouter.delete("/delete-schedule/:scheduleId", scheduleController.deleteSchedule)

export default scheduleRouter;