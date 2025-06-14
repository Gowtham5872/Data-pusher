const Queue = require('bull');
const Redis = require('ioredis');
const dispatch = require('./dispatcher');

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

const dataQueue = new Queue('dataQueue', { redis });
dataQueue.process(async (job) => {
  await dispatch(job.data); 
});

module.exports = dataQueue;
