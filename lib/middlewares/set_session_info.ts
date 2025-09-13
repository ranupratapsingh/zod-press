import express from 'express';
import { extractTokenFromReq, fetchTokenResponse } from '../utils/token_utils.ts';
import type { AppRequest } from '../extensions/app_http_messages.ts';

/**
 * middleware function to set current user on the basis of token in the request.
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
async function setSessionInfo(req: AppRequest, _res: express.Response, next: express.NextFunction) {
  const authToken = extractTokenFromReq(req);
  if(!authToken) return next();

  const tokenInfo = await fetchTokenResponse(authToken);
  req.tokenInfo = tokenInfo;
  next();

  return;
}

export default setSessionInfo;
