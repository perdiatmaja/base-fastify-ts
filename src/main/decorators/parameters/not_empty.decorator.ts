import { getAndSetParameterDescription } from "./parameter.decorator.utils";

export default function setNotEmptyProperty(target: Object, propertyKey: string, parameterIndex: number) {
    return getAndSetParameterDescription(target, propertyKey, parameterIndex, { empty: false })
}