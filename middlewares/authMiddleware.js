const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Member = require('../models/Member');
const Role = require('../models/Role');

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });

    const member = await Member.findOne({ user_id: user._id }).populate('role_id');
    const role = member?.role_id?.role_name || 'Normal';

    req.user = user;
    req.user.role = role;

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};
