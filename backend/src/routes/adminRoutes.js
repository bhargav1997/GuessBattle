const express = require('express');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo('admin', 'superadmin'));

// Admin dashboard
router.get('/dashboard', adminController.getDashboardStats);

// User management
router.get('/users', adminController.getAllUsers);
router.get('/users/:userId', adminController.getUserDetails);
router.patch('/users/:userId', adminController.updateUser);

// Game management
router.get('/games', adminController.getAllGameTables);
router.get('/games/:gameTableId', adminController.getGameTableDetails);

// Transaction management
router.get('/transactions/pending', adminController.getPendingTransactions);

// Admin logs
router.get('/logs', adminController.getAdminLogs);

module.exports = router;
