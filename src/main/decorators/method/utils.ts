import { FastifyRequest } from "fastify"
import ParameterDescription from "../../modules/app/parameter_description"
import PathMapping from "../../modules/app/path_mapping"
import checkBasicAuth from "./basich_auth.handler"

const PATH_MAPPINGS = "pathMappings"
const REQUEST_BODY = "REQUEST_BODY"
const USER_SESSION = "USER_SESSION"
const DEFAULT_ROLE_LEVEL = 5

export function getPathMappings(target: any) {
    let pathMappings = target[PATH_MAPPINGS] as Map<string, PathMapping> ?? new Map()

    return pathMappings
}

export function setPathMapping(path: string,
    type: string,
    target: any,
    propertyKey: string,
    roleLevel?: number
) {
    let pathMappings = getPathMappings(target)
    let pathMapping = pathMappings.get(propertyKey) ?? {};

    pathMapping.path = path
    pathMapping.type = type
    pathMapping.roleLevel = roleLevel ?? DEFAULT_ROLE_LEVEL

    pathMappings.set(propertyKey, pathMapping);

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
        const auth: boolean = pathMapping.auth ?? false
        const jwt: boolean = pathMapping.jwt ?? false
        const parameterDescriptions: ParameterDescription[] = method.parameterDescriptions ?? []

        if (auth) {
            checkBasicAuth(req, pathMapping.roleLevel!)
        }

        for (const parameterDescription of parameterDescriptions) {
            switch (parameterDescription.type) {
                case REQUEST_BODY:
                    params.push(req.body)
                    break
                case USER_SESSION:
                    break
            }
        }

        return method.apply(this, params)
    }
}