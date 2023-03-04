import PathMapping from "../modules/app/path_mapping"

const PATH_MAPPINGS = "pathMappings"

function JwtRequired() {
    return function (
        target: any,
        propertyKey: string,
        _: PropertyDescriptor
    ) {
        let pathMappings = target[PATH_MAPPINGS] as Map<string, PathMapping>
        if (!pathMappings) {
            pathMappings = new Map()
        }

        let pathMapping = pathMappings.get(propertyKey);

        if (!pathMapping) {
            pathMapping = {}
        }
        
        pathMapping.jwt = true
        pathMappings.set(propertyKey, pathMapping);

        (target[PATH_MAPPINGS] as Map<string, PathMapping>) = pathMappings

        return target
    }
}

export default JwtRequired