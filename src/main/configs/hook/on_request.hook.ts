import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import AppLogger from '../../utils/logger.utils';

export interface CustFastifyReq extends FastifyRequest {
    requestTime: Date
}

const onRequestHook = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    AppLogger.writeInfo(`Request: ${request.method}, Path: ${request.routerPath}`);
    (request as CustFastifyReq).requestTime = new Date();
    done()
}

export default onRequestHook