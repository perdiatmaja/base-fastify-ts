import Fastify, { FastifyInstance } from 'fastify'

interface onStart {
    /*
    *Callback before the app started
    */
    (): void
}

class Application {
    private readonly _fastify: FastifyInstance
    constructor() {
        this._fastify = Fastify({})
    }

    private async init() {}
    public get fastify(): FastifyInstance { return this._fastify }
    private initPlugins() {}
    protected onStart() {}
    public start() {}
}

export = Application