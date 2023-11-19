declare function transactionalMethod(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
declare function httpMethodHandler(path: string, roleLevel?: number): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
declare function authRequiredMethod(target: any, propertyKey: string, _: PropertyDescriptor): () => any;
declare function jwtRequiredMethod(target: any, propertyKey: string, _: PropertyDescriptor): () => any;

export { httpMethodHandler as POST }
export { httpMethodHandler as PUT }
export { httpMethodHandler as GET }
export { httpMethodHandler as DELETE }
export { httpMethodHandler as PATCH }
export { transactionalMethod as Transactional }
export { authRequiredMethod as AuthRequired }
export { jwtRequiredMethod as JwtRequired }
