const Destination = require('../models/Destination');


exports.createDestination = async (req, res) => {
  try {
    const { account_id, url, http_method, headers } = req.body;

    const newDestination = await Destination.create({
      account_id,
      url,
      http_method,
      headers,
      created_by: req.user._id,
      updated_by: req.user._id
    });

    res.status(201).json({ success: true, data: newDestination });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create destination' });
  }
};


exports.getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().populate('account_id', 'account_name');
    res.json({ success: true, data: destinations });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch destinations' });
  }
};


exports.getByAccountId = async (req, res) => {
  try {
    const { accountId } = req.params;
    const destinations = await Destination.find({ account_id: accountId });
    res.json({ success: true, data: destinations });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error getting destinations' });
  }
};


exports.updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findByIdAndUpdate(id, {
      ...req.body,
      updated_by: req.user._id
    }, { new: true });

    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });

    res.json({ success: true, data: destination });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update destination' });
  }
};


exports.deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findByIdAndDelete(id);
    if (!destination) return res.status(404).json({ success: false, message: 'Not found' });

    res.json({ success: true, message: 'Destination deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting destination' });
  }
};
