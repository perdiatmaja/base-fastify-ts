import urlPathConfig from '../../configs/json/url_path.config.json'
import basicAuthConfig from '../../configs/json/basic_auth.config.json'
import UnauthorizedAccessError from '../../error/unauthorized_access.error'
import SecurityUtil from '../../utils/security.util'
import { MAIN_PREFIX } from '../../constants/routes.constant'
import { BasicAuthResult } from 'basic-auth'
import { FastifyRequest } from 'fastify'
import UrlUtil from '../../utils/url.utils'
import { getAdminData } from './token.handler'
import InvalidTokenError from '../../error/invalid_token.error'

export interface UserSession {
    id: string
}

const urlPathMap = new Map(Object.entries(urlPathConfig))
const basicAuthMap = new Map(Object.entries(basicAuthConfig))

const needToken = (path: string, authStr?: string): boolean => {
    if (!path) {
        throw new UnauthorizedAccessError()
    }

    const pathArr = path.split("?")[0].substring(1, path.length).split("/")

    if (pathArr.length < 2) {
        throw new UnauthorizedAccessError()
    }
    pathArr.splice(0, 1)

    const pathConfig = getPathConfig(pathArr, 0, getPathMap(path))

    if (!hasAuth(pathConfig.level, SecurityUtil.parseBasicAuth(authStr))) {
        throw new UnauthorizedAccessError()
    }

    return pathConfig.token
}

const getPathMap = (path: string): any => {
    if (path.startsWith(MAIN_PREFIX)) {
        return urlPathConfig
    }

    return urlPathMap
}

const hasAuth = (level: number, auth: BasicAuthResult | undefined): boolean => {
    if (level > 10) {
        return true
    }

    if (!auth) {
        return false
    }
    const basicAuth = basicAuthMap.get(auth.name)

    return basicAuth !== undefined && basicAuth.password === auth.pass && basicAuth.role <= level
}

const getPathConfig = (pathArr: string[], index: number = 0, currentConfig: any = urlPathMap): { token: boolean, level: number } => {
    const pathConfig = currentConfig.get(pathArr[index])

    if (pathConfig === undefined) {
        throw new UnauthorizedAccessError()
    }

    if (pathArr.length > 1 && index < pathArr.length - 1) {
        return getPathConfig(pathArr, index += 1, new Map(Object.entries(pathConfig)))
    }

    return pathConfig
}

const getSession = async (request: FastifyRequest): Promise<UserSession | undefined> => {
    const path = request.routerPath

    if (needToken(path, request.headers.authorization)) {
        if (UrlUtil.isMobile(path)) {
            return await getAdminData(request.session.get("token"))
        } else {
            const token = request.headers.token
            if (token === undefined) throw new InvalidTokenError()
            return await getAdminData(token as string)
        }
    }

    return undefined
}

export default getSession