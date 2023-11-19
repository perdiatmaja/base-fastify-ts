import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import Application from "./springify.app";
import { container } from "tsyringe";

abstract class BaseRouter {
    protected readonly application: Application = container.resolve(Application)

    protected get fastify(): FastifyInstance {
        return this.application.fastify
    }

    private initRoute(): void {}

    private getMainPath() { return undefined; };

    private registerGetRoute<Q>(_: string, __: (request: FastifyRequest<{ Querystring: Q }>) => Promise<any>) {}

    private registerPostRoute<B>(_: string, __: (request: FastifyRequest<{ Body: B }>) => Promise<void> | Promise<any>) {}

    private registerPutRoute<B>(_: string, __: (request: FastifyRequest<{ Body: B }>) => Promise<any>): void {}

    private registerDeleteRoute<B>(_: string, __: (request: FastifyRequest<{ Body: B }>) => Promise<any>): void {}

    private handleRequest(_: FastifyRequest, __: FastifyReply, ___: (request: FastifyRequest<any>) => Promise<any>) {
        return undefined;
    }

    private sendSuccess<T>(_: string, __?: T) {
        return undefined;
    }
}

export = BaseRouter