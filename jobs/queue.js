const Queue = require('bull');
const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

const dataQueue = new Queue('dataQueue', { redis });

module.exports = dataQueue;
