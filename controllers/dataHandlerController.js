const Account = require('../models/Account');
const Log = require('../models/Log');
const dataQueue = require('../jobs/queue');

exports.handleIncomingData = async (req, res) => {
  const token = req.headers['cl-x-token'];
  const eventId = req.headers['cl-x-event-id'];
  const data = req.body;

  if (!token || !eventId) {
    return res.status(400).json({ success: false, message: 'Missing headers' });
  }

  try {
    const account = await Account.findOne({ app_secret_token: token });
    if (!account) {
      return res.status(401).json({ success: false, message: 'Invalid secret token' });
    }

   
    await dataQueue.add({
      event_id: eventId,
      account,
      data
    });

    return res.status(200).json({ success: true, message: 'Data Received' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error processing data' });
  }
};
