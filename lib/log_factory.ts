import pino from 'pino';

const defaultLogger = pino();

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
    const additionalInfo = moduleName ? { mod_name: moduleName } : {};
    return baseLogger.child(additionalInfo);
  }
}

export default LogFactory;
