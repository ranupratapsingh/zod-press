import config from '../config/env.js';
import contextStorage from './context-storage.ts';
import pino from 'pino';

const pinoConfig = {
  name: 'zod-press',
  level: config.logLevel || 'info',
  formatters: {
    level: (label) => {
      return {
        level: label,
      };
    }
  }
};

const defaultLogger = pino(pinoConfig);

class LogFactory {
  static logger = defaultLogger;

  static setLogger(logger: pino.Logger) {
    this.logger = logger;
  }

  /**
   * Get a logger instance for a specific class.
   * @param {string | null} moduleName - The module name to associate with the logger.
   * @returns {pino.Logger} - The logger instance.
   */
  static getLogger(moduleName: string | null = null): pino.Logger {
    const baseLogger = this.logger;
    let additionalInfo: object = moduleName ? { mod_name: moduleName } : {};
    const reqStore: Map<string, unknown> = contextStorage.getStore();
    const reqId = reqStore && reqStore.get('request_id');
    additionalInfo = { ...additionalInfo, request_id: reqId };

    return baseLogger.child(additionalInfo);
  }
}

export default LogFactory;
