interface ParameterDescription {
    type?: string
    empty?: boolean
    name?: string
}
declare function setRequestBodyProperty(target: Object, propertyKey: string, parameterIndex: number):
    (target: any, propertyKey: string, parameterIndex: number, parameterDescription: ParameterDescription) => any;

declare function setPathParamProperty(paramName?: string):
    (target: any, propertyKey: string, parameterIndex: number, parameterDescription: ParameterDescription) => any;

declare function setQueryParamProperty(paramName?: string):
    (target: any, propertyKey: string, parameterIndex: number, parameterDescription: ParameterDescription) => any;

declare function setNotEmptyProperty(target: Object, propertyKey: string, parameterIndex: number):
    (target: any, propertyKey: string, parameterIndex: number, parameterDescription: ParameterDescription) => any;

declare function setRequestProperty(target: Object, propertyKey: string, parameterIndex: number):
    (target: any, propertyKey: string, parameterIndex: number, parameterDescription: ParameterDescription) => any;

declare function setMultipartFileProperty(paramName?: string):
    (target: any, propertyKey: string, parameterIndex: number, parameterDescription: ParameterDescription) => any;

declare function setMultipartParamProperty(paramName?: string):
    (target: any, propertyKey: string, parameterIndex: number, parameterDescription: ParameterDescription) => any;

export { setRequestBodyProperty as RequestBody }
export { setPathParamProperty as PathParam }
export { setQueryParamProperty as QueryParam }
export { setNotEmptyProperty as NotEmpty }
export { setRequestBodyProperty as Request }
export { setMultipartFileProperty as MultipartFile }
export { setMultipartParamProperty as MultipartParam }