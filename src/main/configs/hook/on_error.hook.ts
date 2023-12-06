import { FastifyRequest, FastifyReply } from 'fastify';
import HTTP_CODE from '../../constants/http_code.constant';
import BaseError from '../../error/base.error';
import GeneralError from '../../error/general.errror';
import AppLogger from '../../utils/logger.utils';

const onErrorHook = (throwedError: Error, _: FastifyRequest, reply: FastifyReply) => {
    AppLogger.writeError(throwedError)
    let error = throwedError

    reply.statusCode = HTTP_CODE.SUCCESS

    if (!(error instanceof BaseError)) {
        error = new GeneralError()
    }

    const baseError = (error as BaseError)

    reply.send({
        statusCode: baseError.statusCode,
        code: (error as BaseError).code,
        message: (error as BaseError).message
    })
}

export default onErrorHook