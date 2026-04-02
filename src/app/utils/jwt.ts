import jwt, { JwtPayload } from "jsonwebtoken";

interface Payload {
    email: string,
    role: string
}

export const generateToken = (payload: Payload, private_key: jwt.PrivateKey, time: string) => (
    jwt.sign(payload, private_key, { algorithm: "HS256", expiresIn: time } as jwt.SignOptions)
)

export const verifyToken = (token: string, private_key: jwt.PrivateKey) => (
    jwt.verify(token, private_key as string, { algorithm: "HS256" } as jwt.VerifyOptions) as JwtPayload
)