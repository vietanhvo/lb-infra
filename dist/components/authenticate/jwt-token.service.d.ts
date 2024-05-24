import { AuthenticationTokenData } from '../../common/types';
import { BaseService } from '../../base/base.service';
export declare class JWTTokenService extends BaseService {
    private applicationSecret;
    private jwtSecret;
    private jwtExpiresIn;
    constructor(applicationSecret: string, jwtSecret: string, jwtExpiresIn: string);
    extractCredentials(request: {
        headers: any;
    }): {
        type: string;
        token: string;
    };
    encryptPayload(payload: AuthenticationTokenData): {
        [x: string]: string;
    };
    decryptPayload(decodedToken: any): AuthenticationTokenData;
    verify(opts: {
        type: string;
        token: string;
    }): AuthenticationTokenData;
    generate(payload: AuthenticationTokenData): string;
}
