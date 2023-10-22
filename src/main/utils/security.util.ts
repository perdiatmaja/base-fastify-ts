import auth from 'basic-auth';
import crypto from 'crypto'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import InvalidTokenError from '../error/invalid_token.error';
import UnauthorizedAccessError from '../error/unauthorized_access.error';

const SHA256 = 'sha256'
const DIGEST_HEX = 'hex'

export interface JWTData {
    data: {
        tokenId: string
    }
}

class SecurityUtil {

    static hashPassword(password: string): string {
        return this.sha256(md5(md5(password)))
    }

    static sha256(text: string): string {
        return crypto.createHash(SHA256).update(text).digest(DIGEST_HEX)
    }

    static parseBasicAuth(authStr?: string): auth.BasicAuthResult {
        if (authStr === undefined) {
            throw new UnauthorizedAccessError()
        }

        const basicAuth = auth.parse(authStr)

        if (basicAuth) {
            return basicAuth
        }

        throw new UnauthorizedAccessError()
    }

    static signJwt(data: any): string {
        return jwt.sign({
            data
        }, process.env.ERP_JWT_SECRET as string, { expiresIn: 30 * 24 * 60 * 60 });
    }

    static verifyJwt(jwtToken: string): JWTData {
        try {
            return jwt.verify(jwtToken, process.env.ERP_JWT_SECRET as string) as JWTData
        } catch (error) {
            throw new InvalidTokenError()
        }
    }
}

export default SecurityUtil