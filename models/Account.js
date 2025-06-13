const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const accountSchema = new mongoose.Schema({
  account_id: { type: String, default: uuidv4, unique: true },
  account_name: { type: String, required: true },
  app_secret_token: { type: String, default: () => uuidv4() },
  website: { type: String },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
