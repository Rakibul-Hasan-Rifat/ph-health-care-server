import { Router } from "express";
import scheduleController from "./schedule.controller";

const scheduleRouter = Router();

scheduleRouter.post("/create-schedule", scheduleController.createSchedule)

export default scheduleRouter;