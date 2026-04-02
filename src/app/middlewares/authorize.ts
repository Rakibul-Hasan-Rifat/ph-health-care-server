import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import envConfig from "../../config";

const authorize = (...roles: string[]) => (req: Request & { user?: { email: string, role: string } }, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                data: null,
                message: "Unauthorized! No token provided."
            })
        }

        const verifiedUser = verifyToken(token, envConfig.jwt_access_key as string) as { email: string, role: string };
        if (!verifiedUser) {
            return res.status(403).json({
                success: false,
                statusCode: 403,
                data: null,
                message: "Forbidden! Token verification failed."
            })
        }

        if (roles.length && !roles.includes(verifiedUser.role)) {
            return res.status(403).json({
                success: false,
                statusCode: 403,
                data: null,
                message: "Forbidden! You don't have permission to access this resource."
            })
        }

        req.user = verifiedUser;
        next();
    } catch (error) {
        next(error);
    }
}

export default authorize;