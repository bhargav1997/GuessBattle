const express = require('express');
const walletController = require('../controllers/walletController');
const authController = require('../controllers/authController');
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// User wallet routes
router.post('/buy-chips', walletController.buyChips);
router.post('/sell-chips', walletController.sellChips);
router.get('/transactions', walletController.getTransactionHistory);

// Admin routes
router.use(authController.restrictTo('admin', 'superadmin'));
router.patch('/approve-sell/:transactionId', walletController.approveChipSell);
router.patch('/reject-sell/:transactionId', walletController.rejectChipSell);

module.exports = router;
