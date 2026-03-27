import bcrypt from 'bcryptjs';
import envConfig from '../../../config';
import prisma from "../../shared/prisma";
import { generateToken } from '../../utils/jwt';
import { LoginInterface } from "./auth.interface";
import { Status } from '../../../../prisma/generated/prisma/enums';



const loginService = async ({ email, password }: LoginInterface) => {
    console.log({ email, password });

    const user = await prisma.user.findUnique({
        where: { email, status: Status.ACTIVE },
    });

    if (!user) {
        throw new Error("Credentials are not given properly.");
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) throw new Error("Credentials are not given properly.");

    const accessToken = generateToken({ email: user.email, role: user.role }, envConfig.jwt_access_key as string, "7d")
    const refreshToken = generateToken({ email: user.email, role: user.role }, envConfig.jwt_refresh_key as string, "90d")

    return { needPasswordChange: user.needPasswordChangle, accessToken, refreshToken };

}

const authServices = { loginService };

export default authServices;