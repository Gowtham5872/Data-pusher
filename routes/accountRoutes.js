const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');



router.post('/', protect, isAdmin, accountController.createAccount);
router.get('/', protect, accountController.getAccounts);
router.put('/:id', protect, isAdmin, accountController.updateAccount);
router.delete('/:id', protect, isAdmin, accountController.deleteAccount);

module.exports = router;

