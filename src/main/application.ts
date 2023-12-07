import Fastify, { FastifyInstance } from 'fastify'
import { container, singleton } from 'tsyringe'
import AppConfig from './configs/app.config'
import EnvConfig from './constants/env_config.constant'
import BasePlugin from 'configs/base.plugin'
import RoutesInitializer from './modules/app/routers.initializer'

@singleton()
class Application {
    private readonly _fastify: FastifyInstance
    private readonly _plugins: BasePlugin[] = []

    constructor(private readonly envConfig: EnvConfig) {
        this._fastify = Fastify({})
        this.registerPlugin(container.resolve(RoutesInitializer))
    }

    public registerPlugins(plugins: BasePlugin[]) {
        plugins.forEach(plugin => {
            this._plugins.push(plugin)
        })
    }

    public registerPlugin(plugin: BasePlugin) {
        this._plugins.push(plugin)
    }

    private async init() {
        await this.initPlugins()

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
        
        this.onStart()
    }

    public get fastify(): FastifyInstance {
        return this._fastify
    }

    private async initPlugins() {
        this._plugins.forEach(async (plugin) => await plugin.init())
    }

    protected onStart() {
        //No operation
    }

    public start() {
        this.init()
    }
}

export default Application