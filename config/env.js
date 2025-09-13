import devConfig from './envs/dev.js';
import prodConfig from './envs/prod.js';
import testConfig from './envs/test.js';
import _ from 'lodash';

const nodeEnv = process.env.NODE_ENV || 'development';
const appEnv = process.env.APP_ENV || nodeEnv;

const defaultConfig = {
  appEnv,
  nodeEnv,
  PORT: 3000,
};

let envConfig = {};

if (defaultConfig.appEnv === 'production') {
  envConfig = prodConfig;
} else if (defaultConfig.appEnv === 'test') { // unit test env
  envConfig = testConfig;
} else {
  envConfig = devConfig;
}

const appConfig = _.merge(defaultConfig, envConfig);

export default appConfig;
