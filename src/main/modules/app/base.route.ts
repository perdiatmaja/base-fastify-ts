import getSession, { UserSession } from './get_session';
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { inject } from "tsyringe";
import Application from "../../application";
import AppLogger from "../../utils/logger.utils";

const MULTIPART_REGEX = /multipart/g
abstract class BaseRoute {
    protected readonly application: Application

    constructor(@inject(Application) application: Application) {
        this.application = application
    }

    protected get fastify(): FastifyInstance {
        return this.application.fastify
    }

    abstract initRoute(): void

    registerGetRoute<Q>(path: string, onRoute: (request: FastifyRequest<{ Querystring: Q }>, reply: FastifyReply, userSession?: UserSession) => Promise<void>) {
        this.fastify.get(path, async (request: FastifyRequest<{ Querystring: Q }>, reply: FastifyReply) => {
            this.logRequest(request)
            try {
                await onRoute(request, reply, await getSession(request))
            } catch (error) {
                reply.send(error)
            }
        })
    }

    registerPostRoute<B>(path: string, onRoute: (request: FastifyRequest<{ Body: B }>, reply: FastifyReply, userSession?: UserSession) => Promise<void>) {
        this.fastify.post(path, async (request: FastifyRequest<{ Body: B }>, reply: FastifyReply) => {
            this.logRequest(request)
            try {
                await onRoute(request, reply, await getSession(request))
            } catch (error) {
                reply.send(error)
            }
        })
    }

    registerPutRoute<B>(path: string, onRoute: (request: FastifyRequest<{ Body: B }>, reply: FastifyReply, userSession?: UserSession) => Promise<void>) {
        this.fastify.put(path, async (request: FastifyRequest<{ Body: B }>, reply: FastifyReply) => {
            this.logRequest(request)
            try {
                await onRoute(request, reply, await getSession(request))
            } catch (error) {
                reply.send(error)
            }
        })
    }

    protected sendSuccess(data?: any) {
        return {
            code: 1000,
            message: "Success.",
            data: data
        }
    }

    private logRequest(request: FastifyRequest) {
        if (request.method === "GET") {
            AppLogger.writeInfo(`Params: ${JSON.stringify(request.query)}`)
            return
        }

        const contentType = request.headers['content-type'] ?? ""

        if (MULTIPART_REGEX.exec(contentType) === null) {
            AppLogger.writeInfo(`Params: ${JSON.stringify(request.body)}`)
        }
    }
}

export default BaseRoute