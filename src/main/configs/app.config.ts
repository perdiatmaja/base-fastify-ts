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
import fastifyMultipart from '@fastify/multipart';

enum CONFIG_KEY {
    SECURE_SESSION_ENABLED
}

@singleton()
class AppConfig {
    private readonly fastify: FastifyInstance
    private static _configDataMap: Map<string, any> = new Map() 

    constructor(@inject(delay(() => Application)) application: Application, private readonly envConfig: EnvConfig) {
        this.fastify = application.fastify
    }

    init() {
        this.initDecoration()
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
        if (AppConfig._configDataMap.get(CONFIG_KEY.SECURE_SESSION_ENABLED.toString()) ?? false) {
            this.fastify.register(SecureSessionPlugin, {
                cookieName: this.envConfig.COOKIE_NAME,
                key: this.getSecretKey()
            })
        }
    }

    private initNotFound() {
        this.fastify.setNotFoundHandler({
            preValidation: onPrevalidationHook
        }, (req, rep) => {
            rep.send(new RouteNotFoundError((req.params as NotFoundRouteParams)['*']))
        })
    }

    private initDecoration() {
        this.fastify.decorate("userSession", {
            external_id: undefined,
            type: undefined,
            role: -1
        })

        this.fastify.decorate("configAuth", {
            role: -1
        })
    }

    private getSecretKey(): Buffer {
        return fs.readFileSync(join(this.envConfig.PROJECT_ROOT, `/secret-key`))
    }

    public static enableSecureSession(enable: boolean) {
        AppConfig._configDataMap.set(CONFIG_KEY.SECURE_SESSION_ENABLED.toString(), enable)
    }
}

export default AppConfig