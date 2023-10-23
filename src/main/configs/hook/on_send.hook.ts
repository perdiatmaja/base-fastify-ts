import { CustFastifyReq } from './on_request.hook';
import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';
import md5 from 'md5';
import AppLogger from '../../utils/logger.utils';
import AppConfig from '../app.config';

const onSendHook = (request: FastifyRequest, reply: FastifyReply, payload: any, done: DoneFuncWithErrOrRes) => {
    const payloadJson = JSON.parse(payload)
    const requestTime = (request as CustFastifyReq).requestTime
    const requestId = md5(requestTime.toISOString())

    payloadJson.requestId = requestId

    AppLogger.writeInfo(`requestId: ${requestId}`)
    AppLogger.writeInfo(`requestId: ${requestId}, response: ${payload}`)

    const onSendHandler = AppConfig.getOnSendHandler()

    if (onSendHandler) {
        onSendHandler.handle(payloadJson) 
    }
    const statusCode: number = payloadJson.statusCode
    payloadJson.statusCode = undefined
    
    reply.code(statusCode)

    done(null, JSON.stringify(payloadJson))

    AppLogger.writeInfo(`time: ${(new Date().getTime()) - requestTime.getTime()}ms`)
}

export default onSendHook