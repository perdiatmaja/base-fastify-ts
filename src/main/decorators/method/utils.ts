import { FastifyRequest } from "fastify"
import InvalidDataError from "../../error/invalid_data.error"
import ParameterDescription from "../../modules/app/parameter_description"
import PathMapping from "../../modules/app/path_mapping"
import getAndcheckConfigAuth from "./basich_auth.handler"
import getJwtData from "./jwt.handler"

const PATH_MAPPINGS = "pathMappings"
const REQUEST_BODY = "REQUEST_BODY"
const PATH_PARAM = "PATH_PARAM"
const QUERY_PARAM = "QUERY_PARAM"
const DEFAULT_ROLE_LEVEL = 5

export function getPathMappings(target: any) {
    const pathMappings = target[PATH_MAPPINGS] as Map<string, PathMapping> ?? new Map()

    return pathMappings
}

export function setPathMapping(path: string,
    type: string,
    target: any,
    propertyKey: string,
    roleLevel?: number
) {
    const pathMappings = getPathMappings(target)
    const pathMapping = pathMappings.get(propertyKey) ?? {};

    pathMapping.path = path
    pathMapping.type = type
    pathMapping.roleLevel = roleLevel ?? DEFAULT_ROLE_LEVEL

    pathMappings.set(propertyKey, pathMapping)

    target[PATH_MAPPINGS] = pathMappings

    return target
}

export function getPathMapping(target: any, propertyKey: any) {
    const pathMappings: Map<string, PathMapping> = getPathMappings(target)

    return pathMappings.get(propertyKey) ?? {}
}

export function setMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    target[propertyKey] = async function (req: FastifyRequest) {
        const params: any[] = []
        const pathMapping: PathMapping = getPathMapping(target, propertyKey)
        const authRequired: boolean = pathMapping.authRequired ?? false
        const jwtRequired: boolean = pathMapping.jwtRequired ?? false
        const parameterDescriptions: ParameterDescription[] = method.parameterDescriptions ?? []
        
        if (authRequired) {
            (req as any).configAuth = getAndcheckConfigAuth(req, pathMapping.roleLevel!)
        }

        if (jwtRequired) {
            const jwdData = getJwtData(req)
        }

        for (const parameterDescription of parameterDescriptions) {
            let param = undefined
            switch (parameterDescription.type) {
                case REQUEST_BODY:
                    param = req.body
                    break
                case PATH_PARAM:
                    param = (req.params as any)[parameterDescription.name ?? ""]
                    break
                case QUERY_PARAM:
                    param = (req.query as any)[parameterDescription.name ?? ""]
                    break
            }

            if (parameterDescription.empty && !param) {
                throw new InvalidDataError()
            }

            params.push(param)
        }

        return method.apply(this, params)
    }
}

export default function getParamNames(func: Function) {
    let str = func.toString()

    str = str.replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/(.)*/g, '')
        .replace(/{[\s\S]*}/, '')
        .replace(/=>/g, '')
        .trim()

    var start = str.indexOf("(") + 1
    var end = str.length - 1

    var result = str.substring(start, end).split(", ")

    const params: string[] = []

    result.forEach(element => {
        element = element.replace(/=[\s\S]*/g, '').trim()

        if (element.length > 0)
            params.push(element)
    })

    return params
}