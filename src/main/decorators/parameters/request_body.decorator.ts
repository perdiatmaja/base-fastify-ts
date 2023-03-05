import ParameterDescription from "../../modules/app/parameter_description";

export default function setRequestBodyProperty(target: Object, propertyKey: string, parameterIndex: number) {
    const router = (target as any)
    let parameterDescriptions: ParameterDescription[] = router[propertyKey].parameterDescriptions ?? []

    let parameterDescription: ParameterDescription = {}

    if (parameterDescriptions.length > parameterIndex) {
        parameterDescription = parameterDescriptions[parameterIndex] ?? {}
    }

    parameterDescription.type = "REQUEST_BODY"

    parameterDescriptions[parameterIndex] = parameterDescription

    router[propertyKey].parameterDescriptions = parameterDescriptions

    return router
}