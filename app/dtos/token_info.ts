/**
 * Class for Oauth2 Token Info
 */
class TokenInfo {
  active: boolean;
  scope: string;
  clientId: string;
  sub: string;
  tokenUse: string;
  errors: Array<string>;

  constructor(attrs: object = {}) {
    this.active = attrs['active'];
    this.scope = attrs['scope'];
    this.clientId = attrs['client_id'];
    this.sub = attrs['sub'];
    this.tokenUse = attrs['token_use'];
    this.errors = [];
  }

  isClientToken() {
    return this.clientId === this.sub;
  }

  isUserToken() {
    return this.clientId !== this.sub;
  }

  scopes() {
    return this.scope?.split(' ') || [];
  }
}

export default TokenInfo;
