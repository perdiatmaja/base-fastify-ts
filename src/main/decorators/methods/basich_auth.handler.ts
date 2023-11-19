import { FastifyRequest } from "fastify";
import SecurityUtil from "../../utils/security.util";
import AppConfig from "../../configs/app.config";

const AUTHORIZATION = "authorization"

export default function getAndcheckConfigAuth(req: FastifyRequest, pathRoleLevel: number) {
    const authorization = req.headers[AUTHORIZATION]

    const basicAuth = SecurityUtil.parseBasicAuth(authorization)

    const handler = AppConfig.getBasicAuthHandler()

    if (handler !== undefined) {
        return handler.handle(basicAuth, pathRoleLevel)
    }
    
    return basicAuth
}