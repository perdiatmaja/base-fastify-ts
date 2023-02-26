import { delay } from 'tsyringe';
import { container } from 'tsyringe';
import InvalidTokenError from '../../error/invalid_token.error';
import AppLogger from '../../utils/logger.utils';
import SecurityUtil from '../../utils/security.util';
import GetAdminByEmailUseCase from '../domain/admin/interactor/get_admin_by_email.interactor';
import { UserSession } from './get_session';

const getEventLogUseCase = container.resolve(delay(() => GetAdminByEmailUseCase))

export const getAdminData = async (token?: string): Promise<UserSession> => {
    if (token === undefined) throw new InvalidTokenError()

    const tokenData = SecurityUtil.verifyErpJwt(token)
    const loginEvent = await getEventLogUseCase.blockingExecute({email: ""})

    if (loginEvent.name !== "") {
        throw new InvalidTokenError()
    }

    AppLogger.writeInfo(`loginId: ${tokenData.data.loginId}`)

    return {
        id: loginEvent.id
    }
}