import { AsyncLocalStorage } from 'node:async_hooks';

const contextStorage = new AsyncLocalStorage<Map<string, unknown>>();

export default contextStorage;
