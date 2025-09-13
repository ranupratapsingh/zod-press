import TokenInfo from '../../app/dtos/token_info.ts';
import express from 'express';

// Request and Respose are HTTP Messages
// Extending express Request to add tokenInfo
interface AppRequest extends express.Request {
  tokenInfo?: TokenInfo;
}

export type { AppRequest as AppRequest };
