import PathMapping from "../../modules/app/path_mapping"
import { getPathMappings } from "./method_decorator.utils";

const PATH_MAPPINGS = "pathMappings"

function AuthRequiredMethod(target: any,
    propertyKey: string,
    _: PropertyDescriptor) {
    let pathMappings = getPathMappings(target)
    let pathMapping: PathMapping = pathMappings.get(propertyKey) ?? {};

    pathMapping.authRequired = true

    pathMappings.set(propertyKey, pathMapping);

    (target[PATH_MAPPINGS] as Map<string, PathMapping>) = pathMappings

    return target
}

export default AuthRequiredMethod