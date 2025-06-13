const Account = require('../models/Account');


exports.createAccount = async (req, res) => {
  try {
    const { account_name, website } = req.body;
    const created_by = req.user._id;

    const newAccount = await Account.create({
      account_name,
      website,
      created_by,
      updated_by: created_by
    });

    res.status(201).json({ success: true, data: newAccount });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create account' });
  }
};


exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().populate('created_by updated_by', 'email');
    res.json({ success: true, data: accounts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch accounts' });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_by = req.user._id;

    const account = await Account.findByIdAndUpdate(id, {
      ...req.body,
      updated_by
    }, { new: true });

    if (!account) return res.status(404).json({ success: false, message: 'Account not found' });

    res.json({ success: true, data: account });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update account' });
  }
};


exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Account.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Account not found' });

    res.json({ success: true, message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete account' });
  }
};
