declare function setRequestBodyProperty(target: Object, propertyKey: string, parameterIndex: number):
    (target: Object, propertyKey: string, parameterIndex: number) => any;

declare function setParamProperty(paramName?: string):
    (target: Object, propertyKey: string, parameterIndex: number) => any;

declare function setNotEmptyProperty(target: Object, propertyKey: string, parameterIndex: number):
    (target: Object, propertyKey: string, parameterIndex: number) => any;

export { setRequestBodyProperty as RequestBody }
export { setParamProperty as PathParam }
export { setParamProperty as QueryParam }
export { setNotEmptyProperty as NotEmpty }
export { setRequestBodyProperty as Request }
export { setParamProperty as MultipartFile }
export { setParamProperty as MultipartParam }