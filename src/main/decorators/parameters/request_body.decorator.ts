import ParameterDescription from "../../modules/app/parameter_description";

export default function setRequestBodyProeprty(target: Object, propertyKey: string, parameterIndex: number) {
    const router = (target as any)
    let parameterDescriptions: ParameterDescription[] = router[propertyKey].parameterDescriptions ?? []

    parameterDescriptions[parameterIndex] = {
        type: "REQUEST_BODY"
    }
    
    router[propertyKey].parameterDescriptions = parameterDescriptions

    return router
}