const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role_name: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.models.Role || mongoose.model('Role', roleSchema);
