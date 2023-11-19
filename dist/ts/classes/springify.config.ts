import auth from "basic-auth"
import Application from "./springify.app"
import BaseResponse from "./springify.response"

interface onSendHandler {
    handle<T>(payload: BaseResponse<T>): void
}

interface BasicAuthHandler<T> {
    handle(basicAuth: auth.BasicAuthResult | undefined, pathRoleLevel: number): T
}

class AppConfig {
    constructor(_: Application, private readonly __: any) {}

    init() {}

    private initOnRequest() {}

    private initPreValidation() {}

    private initOnSend() {}

    private initOnError() {}

    private initMultipartRequest() {}

    private initSecureSession() {}

    private initNotFound() {}

    private initDecoration() {}

    private getSecretKey() {}

    public static enableSecureSession(enable: boolean) {}

    public static registerOnSendHandler(handler: onSendHandler) {}

    public static registerBasicAuthHandler<T>(handler: BasicAuthHandler<T>) {}
}

export = AppConfig