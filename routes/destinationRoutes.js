const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');

router.post('/', protect, isAdmin, destinationController.createDestination);
router.get('/', protect, destinationController.getDestinations);
router.get('/account/:accountId', protect, destinationController.getByAccountId);
router.put('/:id', protect, isAdmin, destinationController.updateDestination);
router.delete('/:id', protect, isAdmin, destinationController.deleteDestination);

module.exports = router;
