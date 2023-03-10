import auth from "basic-auth";
import { FastifyRequest } from "fastify";
import basicAuthConfig from '../../configs/json/basic_auth.config.json'
import UnauthorizedAccessError from "../../error/unauthorized_access.error";
import SecurityUtil from "../../utils/security.util";

const AUTHORIZATION = "authorization"
const basicAuthMap = new Map(Object.entries(basicAuthConfig))

export default function getAndcheckConfigAuth(req: FastifyRequest, pathRoleLevel: number) {
    const authorization = req.headers[AUTHORIZATION]

    const basicAuth = SecurityUtil.parseBasicAuth(authorization)
    const configAuth = getConfigAuth(basicAuth)

    if (configAuth.role > pathRoleLevel) {
        throw new UnauthorizedAccessError()
    }

    return configAuth
}

function getConfigAuth(basicAuth?: auth.BasicAuthResult) {
    if (!basicAuth) {
        throw new UnauthorizedAccessError()
    }

    const configAuth = basicAuthMap.get(basicAuth.name)

    if (!configAuth || configAuth.password !== basicAuth.pass) {
        throw new UnauthorizedAccessError()
    }

    return configAuth
}