import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

const validateSchema = (zodSchema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = await zodSchema.parseAsync(JSON.parse(req.body.data))
        next();
    } catch (error) {
        next(error)
    }
}

export default validateSchema;