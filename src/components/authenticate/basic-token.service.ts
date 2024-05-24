import { BaseService } from '@/base/base.service';
import {
  AuthenticateKeys,
  AuthenticationTokenData,
  AuthenticationTokenPayload,
  BasicAuthenticationPayload,
} from '@/common';
import { inject } from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import { securityId } from '@loopback/security';

export class BasicTokenService extends BaseService {
  constructor(
    @inject(AuthenticateKeys.BASIC_USER_PROFILE_FN)
    private getUserIdFn: (props: BasicAuthenticationPayload) => Promise<AuthenticationTokenPayload>,
  ) {
    super({ scope: BasicTokenService.name });
  }

  async verify(credential: { username: string; password: string }): Promise<AuthenticationTokenData> {
    if (!credential) {
      this.logger.error('verify', 'Missing basic credential for validating request!');
      throw new HttpErrors.Unauthorized('Invalid basic request credential!');
    }

    try {
      const { username, password } = credential;

      const basicCredential: BasicAuthenticationPayload = {
        identifier: { scheme: 'username', value: username },
        credential: { scheme: 'basic', value: password },
      };

      const userProfile = await this.getUserIdFn(basicCredential);

      return {
        ...userProfile,
        [securityId]: `${userProfile.userId}`,
      };
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error verifying token : ${error.message}`);
    }
  }
}
