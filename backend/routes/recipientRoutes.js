const express = require('express');
const router = express.Router();
const recipientController = require('../controllers/recipientController');
const authMiddleware = require('../middleware/auth'); // Make sure auth.js exists and checks JWT

router.post('/request', authMiddleware, recipientController.requestBlood);
router.get('/history', authMiddleware, recipientController.getRequestHistory);

module.exports = router;