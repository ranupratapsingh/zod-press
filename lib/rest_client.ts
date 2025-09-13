import pino from 'pino';
import LogFactory from './log_factory.ts';

interface ReqOpts {
  method?: string;
  headers?: any;
  timeout?: number;
  body?: string | URLSearchParams | null;
  signal?: AbortSignal;
}

/**
 * A simple REST client for making HTTP requests.
 */
class RestClient {
  static DEFAULT_TIMEOUT = 2000; // 2 second

  static async get(url: string, query = null, opts?: ReqOpts) {
    const { timeout, headers } = opts || {};
    const fullUrl = query ? `${url}?${new URLSearchParams(query).toString()}` : url;
    const { ok, error, json, response } = await this.request(fullUrl, { method: 'GET', headers, timeout });
    if (ok) {
      return { ok, response, json };
    }

    return {
      ok: false,
      response,
      error,
    };
  }

  static async post(url: string, data = {}, opts?: ReqOpts) {
    const { timeout, headers } = opts || {};
    const body = data instanceof URLSearchParams ? data : JSON.stringify(data);
    let options = {
      method: 'POST',
      body,
      headers,
      timeout,
    };
    const { ok, error, json, response } = await this.request(url, options);
    if (ok) {
      return { ok, response, json };
    }

    return {
      ok: false,
      response,
      error,
    };
  }

  static async patch(url: string, data = {}, opts?: ReqOpts) {
    const { timeout, headers } = opts || {};
    const body = data instanceof URLSearchParams ? data.toString() : JSON.stringify(data);
    let options = {
      method: 'PATCH',
      headers,
      body,
      timeout,
    };
    const { ok, error, json, response } = await this.request(url, options);
    if (ok) {
      return { ok, response, json };
    }

    return {
      ok: false,
      response,
      error,
    };
  }

  static async delete(url: string, opts?: ReqOpts) {
    const { timeout, headers } = opts || {};
    let options = {
      method: 'DELETE',
      headers,
      timeout,
    };
    const { ok, error, json, response } = await this.request(url, options);
    if (ok) {
      return { ok, response, json };
    }

    return {
      ok: false,
      response,
      error,
    };
  }

  /**
   * request method with reasonable defaults
   * @param {*} url the URL to use for request
   * @param {*} options a map supporting keys,
   * @returns Promise for response
   */
  static async request(url: string, options?: ReqOpts) {
    const logger = LogFactory.getLogger('RestClient');
    const {
      body,
      headers,
      method,
      timeout,
    } = options || {};
    // a RequestInit object
    const reqTimeout = timeout || this.DEFAULT_TIMEOUT;
    const reqInitObj: ReqOpts = {
      method: method || 'GET',
      headers: this._reqHeaders(headers),
      body: body ? body : null,
      signal: AbortSignal.timeout(reqTimeout),
    };
    let response: Response;
    let respClone: Response | null = null;
    this._logRequestDetails(url, reqInitObj, logger);
    try {
      response = await fetch(url, reqInitObj);
      respClone = response.clone(); // clone the response to read body in case of error thrown
      const ok = response.ok;
      if (ok) {
        logger.info(`Request successful: ${response.status} ${response.statusText}`);
        const json = await response.json();

        return { ok: response.ok, response, json };
      }

      return { ok, response };
    } catch (err: any) {
      logger.error(`Error in request: ${err.message}`);
      logger.error(err);
      if (err.name === 'TimeoutError') {
        return { error: 'Request timed out' };
      }

      return { response: respClone, error: err.message };
    }
  }

  static _logRequestDetails(url: any, reqInitObj: ReqOpts, logger?: pino.Logger) {
    logger = logger || LogFactory.getLogger('RestClient');
    logger.info({ method: reqInitObj.method, url }, `Started ${reqInitObj.method} for ${url}`);
    logger.debug(`Request Body: ${reqInitObj.body}`);
  }

  static _reqHeaders(headers: {}) {
    const defaultHeaders = getDefaultHeaders();
    headers = headers || {};

    return { ...defaultHeaders, ...headers };
  }
}

function getDefaultHeaders() {
  return {
    accept: 'application/json',
    'content-type': 'application/json'
  };
}

export default RestClient;
