import { NotFoundRouteParams } from './../error/route_not_found.error';
import { FastifyInstance } from 'fastify';
import { delay, inject, singleton } from "tsyringe";
import Application from "../application";
import FastifyHook from '../constants/hook.constant';
import onErrorHook from './hook/on_error.hook';
import onPrevalidationHook from './hook/on_prevalidation.hook';
import onRequestHook from './hook/on_request.hook';
import onSendHook from './hook/on_send.hook';
import SecureSessionPlugin from '@fastify/secure-session';
import fs from 'fs'
import { join } from 'path';
import EnvConfig from '../constants/env_config.constant';
import RouteNotFoundError from '../error/route_not_found.error';
import fastifyMultipart from 'fastify-multipart';

@singleton()
class AppConfig {
    private readonly fastify: FastifyInstance

    constructor(@inject(delay(() => Application)) application: Application, private readonly envConfig: EnvConfig) {
        this.fastify = application.fastify
    }

    init() {
        this.initOnRequest()
        this.initPreValidation()
        this.initOnSend()
        this.initOnError()
        this.initSecureSession()
        this.initNotFound()
        this.initMultipartRequest()
    }

    private initOnRequest() {
        this.fastify.addHook(FastifyHook.ON_REQUEST, onRequestHook)
    }

    private initPreValidation() {
        this.fastify.addHook(FastifyHook.PRE_VALIDATION, onPrevalidationHook)
    }

    private initOnSend() {
        this.fastify.addHook(FastifyHook.ON_SEND, onSendHook)
    }

    private initOnError() {
        this.fastify.setErrorHandler(onErrorHook)
    }

    private initMultipartRequest() {
        this.fastify.register(fastifyMultipart, {
            limits: {
                fieldNameSize: 100,
                fieldSize: 100,
                fileSize: 1000000,
                files: 1
            }
        })
    }

    private initSecureSession() {
        this.fastify.register(SecureSessionPlugin, {
            cookieName: this.envConfig.COOKIE_NAME,
            key: this.getSecretKey()
        })
    }

    private initNotFound() {
        this.fastify.setNotFoundHandler({
            preValidation: onPrevalidationHook
        }, (req, rep) => {
            rep.send(new RouteNotFoundError((req.params as NotFoundRouteParams)['*']))
        })
    }

    private getSecretKey(): Buffer {
        return fs.readFileSync(join(this.envConfig.PROJECT_ROOT, `/secret-key`))
    }
}

export default AppConfig