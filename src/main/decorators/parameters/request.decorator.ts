import { getAndSetParameterDescription } from "./parameter.decorator.utils";

export default function setRequestProperty(target: Object, propertyKey: string, parameterIndex: number) {
    return getAndSetParameterDescription(target, propertyKey, parameterIndex, { type: "REQUEST" })
}