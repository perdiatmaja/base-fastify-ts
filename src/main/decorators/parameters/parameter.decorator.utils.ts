import ParameterDescription from "../../modules/app/parameter_description";

export function getAndSetParameterDescription(router: any,
    propertyKey: string,
    parameterIndex: number,
    parameterDescription: ParameterDescription) {
    let parameterDescriptions: ParameterDescription[] = router[propertyKey].parameterDescriptions

    if (!parameterDescriptions) {
        parameterDescriptions = initParameterDescriptions(router[propertyKey])
    }

    const existingParameterDescription: ParameterDescription = parameterDescriptions[parameterIndex]

    parameterDescriptions[parameterIndex] = mergeAndGetParameterDescription(parameterDescription, existingParameterDescription)

    router[propertyKey].parameterDescriptions = parameterDescriptions

    return router
}

function mergeAndGetParameterDescription(parameterDescription: ParameterDescription,
    existingParameterDescription: ParameterDescription): ParameterDescription {
    if (parameterDescription.empty) {
        existingParameterDescription.empty = parameterDescription.empty
    }

    if (parameterDescription.name) {
        existingParameterDescription.name = parameterDescription.name
    }

    if (parameterDescription.type) {
        existingParameterDescription.type = parameterDescription.type
    }

    return existingParameterDescription
}

function getParamNames(func: Function): string[] {
    const str = func.toString().replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/(.)*/g, '')
        .replace(/{[\s\S]*}/, '')
        .replace(/=>/g, '')
        .trim()

    const start = str.indexOf("(") + 1
    const end = str.length - 1

    const result = str.substring(start, end).split(", ")

    const params: string[] = []

    result.forEach(element => {
        element = element.replace(/=[\s\S]*/g, '').trim()

        if (element.length > 0)
            params.push(element)
    })

    return params
}

function initParameterDescriptions(func: any): ParameterDescription[] {
    const paramNames = getParamNames(func)
    const parameterDescriptions: ParameterDescription[] = []

    for (const paramName of paramNames) {
        parameterDescriptions.push({
            name: paramName
        })
    }

    return parameterDescriptions
}