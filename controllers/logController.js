const Log = require('../models/Log');


exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find().populate('account_id destination_id');
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch logs' });
  }
};


exports.filterLogs = async (req, res) => {
  try {
    const filters = {};

    if (req.query.account_id) filters.account_id = req.query.account_id;
    if (req.query.status) filters.status = req.query.status;

    const logs = await Log.find(filters).populate('account_id destination_id');
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error filtering logs' });
  }
};
