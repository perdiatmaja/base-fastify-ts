import "reflect-metadata"
import Fastify, { FastifyInstance } from 'fastify'
import { container, singleton } from 'tsyringe'
import AppConfig from './configs/app.config'
import EnvConfig from './constants/env_config.constant'
import registerContractDependency from "./di/register_contract.dependency";
import registerRepositoryDependency from "./di/register_repository.dependency";
import DBInitialazer from "./configs/db.initialazer";
import RoutesInitialazer from "./modules/app/routers.initialazer";
import registerAppDependecny from "./di/register_app.dependency";
import registerDBDependecny from "./di/register_db.dependency";

@singleton()
class Application {
    private readonly _fastify: FastifyInstance

    constructor(private readonly envConfig: EnvConfig) {
        this._fastify = Fastify({})
    }

    private async init() {
        const appConfig = container.resolve(AppConfig)
        const address = this.envConfig.IP_BIND
        const port = this.envConfig.PORT ? this.envConfig.PORT : 3000

        appConfig.init()

        if (address) {
            await this._fastify.listen(port, address)
        } else {
            await this._fastify.listen(port)
        }
        console.info(`Connected at: http://${address ? address : 'localhost'}:${port}`)
    }

    public get fastify(): FastifyInstance {
        return this._fastify
    }

    public static start() {
        registerDBDependecny()
        registerRepositoryDependency()
        registerContractDependency()
        registerAppDependecny()

        const routesInitialazer = container.resolve(RoutesInitialazer)
        const dbInitialazer = container.resolve(DBInitialazer)
        const app = container.resolve(Application)

        routesInitialazer.initRoutes()
        dbInitialazer.initModels()
        app.init()
    }
}

export default Application