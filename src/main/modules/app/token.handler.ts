import { delay } from 'tsyringe';
import { container } from 'tsyringe';
import InvalidTokenError from '../../error/invalid_token.error';
import AppLogger from '../../utils/logger.utils';
import SecurityUtil from '../../utils/security.util';
import GetEventLogUseCase from '../domain/eventlog/interactor/get_event_log.usecase';
import EventLogConstant from './auth/constant/event_log.constant';
import { UserSession } from './get_session';

const getEventLogUseCase = container.resolve(delay(() => GetEventLogUseCase))

export const getAdminData = async (token?: string): Promise<UserSession> => {
    if (token === undefined) throw new InvalidTokenError()

    const tokenData = SecurityUtil.verifyErpJwt(token)
    const loginEvent = await getEventLogUseCase.blockingExecute({ id: tokenData.data.loginId })

    if (loginEvent.type !== EventLogConstant.type.ADMIN_LOGIN) {
        throw new InvalidTokenError()
    }

    AppLogger.writeInfo(`loginId: ${tokenData.data.loginId}`)

    return {
        id: loginEvent.userId
    }
}