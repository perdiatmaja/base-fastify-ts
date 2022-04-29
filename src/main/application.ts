import Fastify, { FastifyInstance } from 'fastify'
import { container, singleton } from 'tsyringe'
import AppConfig from './configs/app.config'
import EnvConfig from './constants/env_config.constant'

@singleton()
class Application {
    private readonly _fastify: FastifyInstance

    constructor(private readonly envConfig: EnvConfig) {
        this._fastify = Fastify({})
    }

    async start() {
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
}

export default Application