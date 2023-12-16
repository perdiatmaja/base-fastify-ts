import Fastify, { FastifyInstance } from 'fastify'
import { container, singleton } from 'tsyringe'
import AppConfig from './configs/app.config'
import BasePlugin from './configs/base.plugin'
import RoutesInitializer from './modules/app/routers.initializer'

@singleton()
class Application {
    private readonly _fastify: FastifyInstance
    private readonly _plugins: BasePlugin[] = []

    constructor() {
        this._fastify = Fastify({})
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
        this.registerPlugin(container.resolve(RoutesInitializer))
        await this.initPlugins()

        const appConfig = container.resolve(AppConfig)
        appConfig.init()
        await this._fastify.listen(3000)

        console.info(`Connected at: http://localhost:3000`)
        
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

    public async start() {
       await this.init()
    }
}

export default Application