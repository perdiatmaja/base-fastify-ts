import auth from 'basic-auth';
import crypto from 'crypto'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import InvalidTokenError from '../error/invalid_token.error';

const SHA256 = 'sha256'
const DIGEST_HEX = 'hex'

export interface JWTData {
    data: {
        loginId: string
    }
}

class SecurityUtil {

    static hashPassword(password: string): string {
        return this.sha256(md5(md5(password)))
    }

    static sha256(text: string): string {
        return crypto.createHash(SHA256).update(text).digest(DIGEST_HEX)
    }

    static parseBasicAuth(authStr?: string): auth.BasicAuthResult | undefined {
        return authStr ? auth.parse(authStr) : undefined
    }

    static signErpJwt(data: any): string {
        return jwt.sign({
            data
        }, process.env.ERP_JWT_SECRET as string, { expiresIn: 30 * 24 * 60 * 60 });
    }

    static signMobileJwt(data: any): string {
        return jwt.sign({
            data
        }, process.env.MOBILE_JWT_SECRET as string, { expiresIn: 30 * 24 * 60 * 60 });
    }

    static verifyErpJwt(jwtToken: string): JWTData {
        try {
            return jwt.verify(jwtToken, process.env.ERP_JWT_SECRET as string) as JWTData
        } catch (error) {
            throw new InvalidTokenError()
        }
    }

    static verifyMobileJwt(jwtToken: string): JWTData {
        try {
            return jwt.verify(jwtToken, process.env.MOBILE_JWT_SECRET as string) as JWTData
        } catch (error) {
            throw new InvalidTokenError()
        }
    }
}

export default SecurityUtil