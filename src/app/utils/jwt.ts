import jwt from "jsonwebtoken";

interface Payload {
    email: string,
    role: string
}

export const generateToken = (payload: Payload, private_Key: jwt.PrivateKey, time: string) => (
    jwt.sign(payload, private_Key, { algorithm: "HS256", expiresIn: time } as jwt.SignOptions)
)