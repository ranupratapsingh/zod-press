import LogFactory from '../lib/log_factory.ts';
import Redis from 'ioredis';
import config from '../config/env.js';
import secrets from './secrets.js';

const {
  cache_redis: redisConf,
} = config;

// Check if TLS is enabled
if (redisConf.tls) {
  redisConf.username = secrets.cache_redis.username;
  redisConf.password = secrets.cache_redis.password;
  redisConf.tls = {
    rejectUnauthorized: false
  };
}

const RedisConstructor = redisConf.clusterMode ? Redis.Cluster : Redis;
const redisClient = new RedisConstructor(
  redisConf.clusterMode ? [redisConf] : redisConf
);

redisClient.on('ready', () => {
  LogFactory.getLogger().info('Redis connection successful');
});

redisClient.on('error', (err) => {
  LogFactory.getLogger().error(err.message);
});

process.on('exit', () => {
  redisClient.quit();
});

export default redisClient;
