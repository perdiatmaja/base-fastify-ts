import { CustFastifyReq } from './on_request.hook';
import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';
import md5 from 'md5';
import AppLogger from '../../utils/logger.utils';

const onSendHook = (request: FastifyRequest, reply: FastifyReply, payload: any, done: DoneFuncWithErrOrRes) => {
    const payloadJson = JSON.parse(payload)
    const requestTime = (request as CustFastifyReq).requestTime
    const requestId = md5(requestTime.toISOString())

    payloadJson.requestId = requestId

    AppLogger.writeInfo(`requestId: ${requestId}`)
    done(null, JSON.stringify(payloadJson))
    AppLogger.writeInfo(`time: ${(new Date().getTime()) - requestTime.getTime()}ms`)
}

export default onSendHook