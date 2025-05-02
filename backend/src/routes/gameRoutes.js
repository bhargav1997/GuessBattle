const express = require('express');
const gameController = require('../controllers/gameController');
const authController = require('../controllers/authController');
const router = express.Router();

// Public routes
router.get('/active', gameController.getActiveGameTables);
router.get('/waiting', gameController.getWaitingGameTables);
router.get('/:gameTableId', gameController.getGameDetails);

// Protect all routes after this middleware
router.use(authController.protect);

// Game routes
router.post('/create', gameController.createGameTable);
router.post('/join', gameController.joinGameTable);
router.post('/guess', gameController.placeGuess);
router.get('/history', gameController.getUserGameHistory);

// Admin routes
router.use(authController.restrictTo('admin', 'superadmin'));
router.post('/:gameTableId/evaluate', gameController.evaluateGame);

module.exports = router;
