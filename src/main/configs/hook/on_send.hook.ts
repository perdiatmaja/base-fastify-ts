import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';
import AppConfig from '../app.config';
import BaseResponse from '../../modules/app/base_response';

const onSendHook = (_: FastifyRequest, reply: FastifyReply, payload: any, done: DoneFuncWithErrOrRes) => {
    const payloadJson: BaseResponse<any> = JSON.parse(payload)

    const onSendHandler = AppConfig.getOnSendHandler()

    if (onSendHandler) {
        onSendHandler.handle(payloadJson) 
    }
    const statusCode: number = payloadJson.statusCode!
    payloadJson.statusCode = undefined
    
    reply.code(statusCode)

    done(null, JSON.stringify(payloadJson.data))
}

export default onSendHook