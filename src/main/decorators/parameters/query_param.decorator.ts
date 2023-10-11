import { getAndSetParameterDescription } from "./parameter.decorator.utils";

export default function setQueryParamProperty(paramName?: string) {
    return function (target: Object, propertyKey: string, parameterIndex: number) {
        return getAndSetParameterDescription(target, propertyKey, parameterIndex, { type: "QUERY_PARAM", name: paramName })
    }
}