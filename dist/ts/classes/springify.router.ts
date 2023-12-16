import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

declare abstract class BaseRouter {
    protected get fastify(): FastifyInstance;

    private initRoute(): void;

    private getMainPath(): void;

    private registerGetRoute<Q>(_: string, __: (request: FastifyRequest<{ Querystring: Q }>) => Promise<any>);

    private registerPostRoute<B>(_: string, __: (request: FastifyRequest<{ Body: B }>) => Promise<void> | Promise<any>);

    private registerPutRoute<B>(_: string, __: (request: FastifyRequest<{ Body: B }>) => Promise<any>): void;

    private registerDeleteRoute<B>(_: string, __: (request: FastifyRequest<{ Body: B }>) => Promise<any>): void;

    private handleRequest(_: FastifyRequest, __: FastifyReply, ___: (request: FastifyRequest<any>) => Promise<any>);

    private sendSuccess<T>(_: string, __?: T): void;
}

export = BaseRouter