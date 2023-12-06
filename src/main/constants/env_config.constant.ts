import { singleton } from "tsyringe"

const processEnv = process.env

@singleton()
class EnvConfig {

    readonly PROJECT_ROOT: string
    readonly COOKIE_NAME: string
    readonly IP_BIND: string
    readonly PORT: string | undefined

    constructor() {
        this.PROJECT_ROOT = processEnv.PWD as string
        this.COOKIE_NAME = processEnv.COOKIE_NAME as string
        this.IP_BIND = processEnv.IP_BIND as string
        this.PORT = processEnv.PORT
    }
}

export default EnvConfig