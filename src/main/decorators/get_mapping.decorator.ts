import PathMapping from "../modules/app/path_mapping"

const PATH_MAPPINGS = "pathMappings"

function GET(path: string) {
    return function (
        target: any,
        propertyKey: string,
        _: PropertyDescriptor
    ) {
        if (!target[PATH_MAPPINGS]) {
            target[PATH_MAPPINGS] = [];
        }

        (target[PATH_MAPPINGS] as PathMapping[]).push({
            key: propertyKey,
            path: path,
            type: "GET"
        })

        return target
    }
}

export default GET