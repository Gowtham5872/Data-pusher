const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Member = require('../models/member');
const Role = require('../models/role');
const Account = require('../models/account');

exports.register = async (req, res) => {
  try {
    const { email, password, account_name, website } = req.body;

    if (!email || !password || !account_name) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    const account = await Account.create({
      account_name,
      website: website || '',
      created_by: user._id,
      updated_by: user._id
    });

    let adminRole = await Role.findOne({ role_name: 'Admin' });
    if (!adminRole) {
      adminRole = await Role.create({ role_name: 'Admin' });
    }

    await Member.create({
      user_id: user._id,
      account_id: account._id,
      role_id: adminRole._id,
      created_by: user._id,
      updated_by: user._id
    });

    const token = jwt.sign(
      {
        id: user._id,
        account_id: account._id,
        role: adminRole.role_name
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ success: true, token });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Email not found' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    const member = await Member.findOne({ user_id: user._id }).populate('role_id');

    const token = jwt.sign(
      {
        id: user._id,
        account_id: member?.account_id,
        role: member?.role_id?.role_name || 'Normal'
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ success: true, token });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};