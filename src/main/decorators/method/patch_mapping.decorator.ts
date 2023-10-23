import { PATCH } from "../../modules/app/http_method"
import { setMethod, setPathMapping } from "./method_decorator.utils"

/**
 * Method decorator to register PATCH method API
 */

export default function putMethod(path: string) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        setMethod(target, propertyKey, descriptor)
        return setPathMapping(path, PATCH, target, propertyKey)
    }
}