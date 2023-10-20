import InvalidTokenError from '../../error/invalid_token.error';
import AppLogger from '../../utils/logger.utils';
import SecurityUtil, { JWTData } from '../../utils/security.util';

export const getAdminData = async (token?: string): Promise<JWTData> => {
    if (token === undefined) throw new InvalidTokenError()

    const tokenData = SecurityUtil.verifyJwt(token)

    AppLogger.writeInfo(`token: ${tokenData}`)

    return tokenData
}