const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// User profile routes
router.get('/profile', userController.getProfile);
router.patch('/profile', userController.updateProfile);
router.patch('/change-password', userController.changePassword);
router.get('/stats', userController.getUserStats);

// Leaderboard
router.get('/leaderboard', userController.getLeaderboard);

module.exports = router;
