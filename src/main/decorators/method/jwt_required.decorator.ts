import PathMapping from "../../modules/app/path_mapping";
import { getPathMappings } from "./utils";

const PATH_MAPPINGS = "pathMappings"

function JwtRequired() {
    return function (
        target: any,
        propertyKey: string,
        _: PropertyDescriptor
    ) {
        let pathMappings = getPathMappings(target)
        let pathMapping: PathMapping = pathMappings.get(propertyKey) ?? {};
        
        pathMapping.jwt = true

        pathMappings.set(propertyKey, pathMapping);

        (target[PATH_MAPPINGS] as Map<string, PathMapping>) = pathMappings

        return target
    }
}

export default JwtRequired