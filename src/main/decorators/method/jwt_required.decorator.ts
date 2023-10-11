import PathMapping from "../../modules/app/path_mapping";
import { getPathMapping, getPathMappings } from "./method_decorator.utils";

const PATH_MAPPINGS = "pathMappings"

function JwtRequired(
    target: any,
    propertyKey: string,
    _: PropertyDescriptor
) {
    const pathMappings = getPathMappings(target)
    const pathMapping  = getPathMapping(target, propertyKey)

    pathMapping.jwtRequired = true

    pathMappings.set(propertyKey, pathMapping);

    (target[PATH_MAPPINGS] as Map<string, PathMapping>) = pathMappings

    return target
}

export default JwtRequired