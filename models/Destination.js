const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  url: { type: String, required: true },
  http_method: { type: String, required: true, enum: ['GET', 'POST', 'PUT', 'DELETE'] },
  headers: { type: Object, required: true }, // key-value pairs
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);
