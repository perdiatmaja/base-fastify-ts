import { getAndSetParameterDescription } from "./parameter.decorator.utils";

export default function setRequestBodyProperty(target: Object, propertyKey: string, parameterIndex: number) {
    return getAndSetParameterDescription(target, propertyKey, parameterIndex, {
        type: "REQUEST_BODY"
    })
}