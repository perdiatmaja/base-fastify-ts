import { FastifyRequest } from "fastify";
import InvalidTokenError from "../../error/invalid_token.error";
import SecurityUtil from "../../utils/security.util";

const JWT_TOKEN = "token"

export default async function getJwtData(req: FastifyRequest, pathRole: number) {
    const jwtToken: string | string[] | undefined = req.headers[JWT_TOKEN]

    if (!jwtToken) {
        throw new InvalidTokenError()
    }

    const jwtData = SecurityUtil.verifyJwt(jwtToken.toString())

    switch (pathRole) {
        case 5:
        default:
            return null
    }
}