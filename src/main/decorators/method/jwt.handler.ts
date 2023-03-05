import { FastifyRequest } from "fastify";
import InvalidTokenError from "../../error/invalid_token.error";
import SecurityUtil from "../../utils/security.util";

const JWT_TOKEN = "token"

export default function getJwtData(req: FastifyRequest) {
    const jwtToken: string | string[] | undefined = req.headers[JWT_TOKEN]

    if (!jwtToken) {
        throw new InvalidTokenError()
    }

    const jwtData = SecurityUtil.verifyJwt(jwtToken.toString())

    return jwtData
}