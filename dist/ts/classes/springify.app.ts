import { FastifyInstance } from 'fastify'
import BasePlugin from './springify.plugin'

declare class Application {
    constructor();

    public registerPlugins(plugins: BasePlugin[]): void;
    public registerPlugin(plugin: BasePlugin): void;
    private init(): Promise<void>
    public get fastify(): FastifyInstance;
    private initPlugins(): void;
    protected onStart(): void;
    public start(): Promise<void>;
}

export = Application