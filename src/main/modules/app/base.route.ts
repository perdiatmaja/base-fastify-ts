import getSession, { UserSession } from './get_session';
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { inject } from "tsyringe";
import Application from "../../application";
import AppLogger from "../../utils/logger.utils";
import PathMapping from './path_mapping';

const MAIN_PATH = "mainPath"
const POST = "POST"
const GET = "GET"
const PUT = "PUT"

const MULTIPART_REGEX = /multipart/g
abstract class BaseRoute {
    protected readonly application: Application
    
    constructor(@inject(Application) application: Application) {
        this.application = application
    }

    protected get fastify(): FastifyInstance {
        return this.application.fastify
    }

    initRoute(): void {
        const router: any = this as any
        const pathMappings = router["pathMappings"] as Map<string, PathMapping>

        pathMappings.forEach((pathMapping: PathMapping, key: string) => {
            switch (pathMapping.type) {
                case POST:
                    this.registerPostRoute(pathMapping.path!, async (req, rep) => {
                        await router[key](req, rep, pathMapping.jwt? await getSession(req): undefined)
                    })
                    break;
                case GET:
                    this.registerGetRoute(pathMapping.path!, async (req, rep) => {
                        await router[key](req, rep, pathMapping.jwt ? await getSession(req) : undefined)
                    })
                    break;
                case PUT:
                    this.registerPutRoute(pathMapping.path!, async (req, rep) => {
                        await router[key](req, rep, pathMapping.jwt ? await getSession(req) : undefined)
                    })
                    break;
            }
        })
    }

    private getMainPath(): string {
        const router: any = this as any
        return router[MAIN_PATH]
    }

    registerGetRoute<Q>(path: string, onRoute: (request: FastifyRequest<{ Querystring: Q }>, reply: FastifyReply, userSession?: UserSession) => Promise<void>) {
        this.fastify.get(this.getMainPath() + path, async (request: FastifyRequest<{ Querystring: Q }>, reply: FastifyReply, userSession?: UserSession) => {
            try {
                await onRoute(request, reply, userSession)
            } catch (error) {
                reply.send(error)
            }
        })
    }

    registerPostRoute<B>(path: string, onRoute: (request: FastifyRequest<{ Body: B }>, reply: FastifyReply, userSession?: UserSession) => Promise<void> | Promise<any>) {
        this.fastify.post(this.getMainPath() + path, async (request: FastifyRequest<{ Body: B }>, reply: FastifyReply, userSession?: UserSession) => {
            try {
                const response = await onRoute(request, reply, userSession)
                reply.send(this.sendSuccess(response))
            } catch (error) {
                reply.send(error)
            }
        })
    }

    registerPutRoute<B>(path: string, onRoute: (request: FastifyRequest<{ Body: B }>, reply: FastifyReply, userSession?: UserSession) => Promise<void>) {
        this.fastify.put(this.getMainPath() + path, async (request: FastifyRequest<{ Body: B }>, reply: FastifyReply, userSession?: UserSession) => {
            try {
                await onRoute(request, reply, userSession)
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