const axios = require('axios');
const dataQueue = require('./queue');
const Log = require('../models/Log');
const Destination = require('../models/Destination');

dataQueue.process(async (job) => {
  const { account, event_id, data } = job.data;
  const destinations = await Destination.find({ account_id: account._id });

  for (const dest of destinations) {
    try {
      await axios({
        method: dest.http_method,
        url: dest.url,
        data,
        headers: dest.headers
      });

      await Log.create({
        event_id,
        account_id: account._id,
        destination_id: dest._id,
        received_data: data,
        status: 'success',
        received_timestamp: new Date(),
        processed_timestamp: new Date()
      });
    } catch (err) {
      await Log.create({
        event_id,
        account_id: account._id,
        destination_id: dest._id,
        received_data: data,
        status: 'failed',
        received_timestamp: new Date(),
        processed_timestamp: new Date()
      });
    }
  }
});
