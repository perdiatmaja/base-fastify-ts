import { FastifyRequest } from "fastify"
import ParameterDescription from "../../modules/app/parameter_description"
import PathMapping from "../../modules/app/path_mapping"

const PATH_MAPPINGS = "pathMappings"
const REQUEST_BODY = "REQUEST_BODY"
const USER_SESSION = "USER_SESSION"

export function setPathMapping(path: string,
    type: string,
    target: any,
    propertyKey: string
) {
    let pathMappings = target[PATH_MAPPINGS] as Map<string, PathMapping>
    if (!pathMappings) {
        pathMappings = new Map()
    }

    let pathMapping = pathMappings.get(propertyKey);

    if (!pathMapping) {
        pathMapping = {}
    }

    pathMapping.path = path
    pathMapping.type = type
    pathMappings.set(propertyKey, pathMapping);

    target[PATH_MAPPINGS] = pathMappings

    return target
}

export function setMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    target[propertyKey] = async function (req: FastifyRequest) {
        const params: any[] = []
        const parameterDescriptions: ParameterDescription[] = method.parameterDescriptions ?? []

        for (const parameterDescription of parameterDescriptions) {
            switch (parameterDescription.type) {
                case REQUEST_BODY:
                    params.push(req.body)
                    break
                case USER_SESSION:
            }
        }

        return method.apply(this, params)
    }
}