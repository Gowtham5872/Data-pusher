const express = require('express');
const router = express.Router();
const { handleIncomingData } = require('../controllers/dataHandlerController');
const { rateLimiter } = require('../middlewares/rateLimiter');

router.post('/incoming_data', rateLimiter, handleIncomingData);

module.exports = router;
