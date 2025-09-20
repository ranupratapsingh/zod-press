import express from 'express';
import LogFactory from '../log_factory.ts';
import RestClient from '../rest_client.ts';
import config from '../../config/env.js';
import TokenInfo from '../../app/dtos/token_info.ts';

async function fetchTokenResponse(token: string): Promise<TokenInfo | undefined> {
  const logger = LogFactory.getLogger('tokenUtil#fetchTokenResponse');
  if (!token || (token.split('.').length < 2)) {
    logger.warn('Invalid token format');
    return;
  }

  const data = new URLSearchParams();
  data.append('token', token);
  const fullUrl = `${config.authTokenS2sUrl}/v1/oauth2/introspect`;
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };
  try {
    const { ok, json, error } = await RestClient.get(fullUrl, data, { headers });;
    if (ok) {
      const tokenInfo = new TokenInfo(json);
      return tokenInfo;
    }
    logger.error(error);
  } catch (err: any) {
    logger.error('Error fetching Auth Token: ' + err.message);
  }
}

/**
 * Extracts the token from the request header
 * @param {Object} req - The request object
 * @returns {string|null} The extracted token or null if not found
 */
function extractTokenFromReq(req: express.Request): string | null {
  const bearerToken = req.header('Authorization');
  if (!bearerToken) {
    return null;
  }

  const token = bearerToken.split(' ')[1];
  if (!token || (token.split('.').length < 2)) {
    LogFactory.getLogger('tokenUtil#extractTokenFromReq').warn('Invalid token format');
    return null;
  }

  return token;
}

export {
  extractTokenFromReq,
  fetchTokenResponse,
};
