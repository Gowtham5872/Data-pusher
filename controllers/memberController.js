const Member = require('../models/Member');


exports.addMember = async (req, res) => {
  try {
    const { account_id, user_id, role_id } = req.body;
    const created_by = req.user._id;

    const existing = await Member.findOne({ account_id, user_id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already a member of this account' });
    }

    const newMember = await Member.create({
      account_id,
      user_id,
      role_id,
      created_by,
      updated_by: created_by
    });

    res.status(201).json({ success: true, data: newMember });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add member' });
  }
};


exports.getMembersByAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const members = await Member.find({ account_id: accountId })
      .populate('user_id', 'email')
      .populate('role_id', 'role_name');

    res.json({ success: true, data: members });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch members' });
  }
};
