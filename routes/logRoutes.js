const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, logController.getAllLogs);
router.get('/filter', protect, logController.filterLogs);

module.exports = router;
