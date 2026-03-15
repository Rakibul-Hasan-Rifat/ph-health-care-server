import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

const validateSchema = async (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedPayload = await schema.parseAsync(req.body)
        console.log('validate schema', validatedPayload);
        next();
    } catch (error) {
        next(error)
    }
}

export default validateSchema;