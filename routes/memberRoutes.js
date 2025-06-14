const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');

router.post('/', protect, isAdmin, memberController.addMember);
router.get('/account/:accountId', protect, memberController.getMembersByAccount);

module.exports = router;
