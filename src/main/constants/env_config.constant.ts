import { Dialect } from "sequelize/types"
import { singleton } from "tsyringe"

const processEnv = process.env
const TRUE_STR = 'true'

@singleton()
class EnvConfig {

    readonly PROJECT_ROOT: string
    readonly COOKIE_NAME: string
    readonly IP_BIND: string
    readonly PORT: string | undefined
    readonly DB_NAME: string
    readonly DB_USERNAME: string
    readonly DB_PASSWORD: string
    readonly DB_DIALECT: Dialect
    readonly DB_HOST: string
    readonly DB_PORT: number
    readonly DB_LOG: boolean
    readonly ASSETS_PATH: string

    constructor() {
        this.PROJECT_ROOT = processEnv.PWD as string
        this.COOKIE_NAME = processEnv.COOKIE_NAME as string
        this.IP_BIND = processEnv.IP_BIND as string
        this.PORT = processEnv.PORT
        this.DB_NAME = processEnv.DB_NAME as string
        this.DB_USERNAME = processEnv.DB_USERNAME as string
        this.DB_PASSWORD = processEnv.DB_PASSWORD as string
        this.DB_DIALECT = processEnv.DB_DIALECT as Dialect
        this.DB_HOST = processEnv.DB_HOST as string
        this.DB_PORT = parseInt(processEnv.DB_PORT as string)
        this.DB_LOG = TRUE_STR === processEnv.DB_LOG
        this.ASSETS_PATH = processEnv.ASSETS_PATH as string
    }
}

export default EnvConfig