import { BaseService } from '../../base/base.service';
import { AuthenticationTokenData, AuthenticationTokenPayload, BasicAuthenticationPayload } from '../../common';
export declare class BasicTokenService extends BaseService {
    private getUserIdFn;
    constructor(getUserIdFn: (props: BasicAuthenticationPayload) => Promise<AuthenticationTokenPayload>);
    verify(credential: {
        username: string;
        password: string;
    }): Promise<AuthenticationTokenData>;
}
