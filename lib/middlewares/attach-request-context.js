import contextStorage from '../context-storage.ts';
import crypto from 'node:crypto';

// middleware for handling error
async function attachRequestContext(req, _res, next) {
  req = _assignId(req);
  const store = new Map();
  store.set('request_id', req.uuid);
  contextStorage.run(store, () => {
    next();
  });
}

// private functions
function _assignId(req) {
  if (req.uuid) return req.uuid;

  // assign a unique id to the request if not already assigned
  req.uuid = req.headers['x-request-id'] || crypto.randomUUID();
  return req;
}

export default attachRequestContext;
