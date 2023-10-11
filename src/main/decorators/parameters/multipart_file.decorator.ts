import { getAndSetParameterDescription } from "./parameter.decorator.utils";

export default function setMultipartFileProperty(paramName?: string) {
    return function (target: Object, propertyKey: string, parameterIndex: number) {
        return getAndSetParameterDescription(target, propertyKey, parameterIndex, {
            type: "MULTIPART_FILE",
            name: paramName
        })
    }
}