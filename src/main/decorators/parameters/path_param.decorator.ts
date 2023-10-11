import { getAndSetParameterDescription } from "./parameter.decorator.utils";

export default function setPathParamProperty(paramName?: string) {
    return function (target: Object, propertyKey: string, parameterIndex: number) {
        return getAndSetParameterDescription(target, propertyKey, parameterIndex, { type: "PATH_PARAM", name: paramName })
    }
}