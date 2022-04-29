import { FastifyRequest, FastifyReply } from 'fastify';
import { DatabaseError, UniqueConstraintError, ValidationError } from 'sequelize';
import HTTP_CODE from '../../constants/http_code.constant';
import BaseError from '../../error/base.error';
import DataExistError from '../../error/data_exist.error';
import GeneralError from '../../error/general.errror';
import InvalidDataError from '../../error/invalid_data.error';
import AppLogger from '../../utils/logger.utils';

const SEQUELIZE_INVALID_INPUT_SYNTAX = 'invalid input syntax'

const onValidationError = (error: ValidationError | DatabaseError) => {
    if (error instanceof UniqueConstraintError) {
        return new DataExistError()
    } else if (error.message.startsWith(SEQUELIZE_INVALID_INPUT_SYNTAX)) {
        return new InvalidDataError()
    } else {
        return new GeneralError()
    }
}

const onErrorHook = (throwedError: Error, _: FastifyRequest, reply: FastifyReply) => {
    AppLogger.writeError(throwedError)
    let error = throwedError

    reply.statusCode = HTTP_CODE.SUCCESS

    if (error instanceof ValidationError || error instanceof DatabaseError) {
        error = onValidationError(error)
    } else if (!(error instanceof BaseError)) {
        error = new GeneralError()
    }

    reply.send({
        code: (error as BaseError).code,
        message: (error as BaseError).message
    })
}

export default onErrorHook