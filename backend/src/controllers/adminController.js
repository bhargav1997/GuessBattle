const mongoose = require('mongoose');
const User = require('../models/User');
const GameTable = require('../models/GameTable');
const GameParticipant = require('../models/GameParticipant');
const Transaction = require('../models/Transaction');
const AdminLog = require('../models/AdminLog');

// Get all users with pagination
exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    // Build query
    let query = {};
    
    if (search) {
      query = {
        $or: [
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Get users
    const users = await User.find(query)
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count
    const total = await User.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get user details
exports.getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    // Get user
    const user = await User.findById(userId).select('-passwordHash');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Get user's game participations
    const participations = await GameParticipant.find({ userId })
      .populate('gameTableId')
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Get user's transactions
    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Calculate stats
    const totalWins = await GameParticipant.countDocuments({ 
      userId,
      isWinner: true
    });
    
    const totalGames = await GameParticipant.countDocuments({ userId });
    const winRate = totalGames > 0 ? (totalWins / totalGames) * 100 : 0;
    
    // Calculate total winnings
    const winnings = await GameParticipant.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId), isWinner: true } },
      { $group: { _id: null, total: { $sum: '$winAmount' } } }
    ]);
    
    const totalWinnings = winnings.length > 0 ? winnings[0].total : 0;
    
    res.status(200).json({
      success: true,
      data: {
        user,
        stats: {
          totalGames,
          totalWins,
          winRate: winRate.toFixed(2),
          totalWinnings
        },
        recentGames: participations,
        recentTransactions: transactions
      }
    });
  } catch (err) {
    next(err);
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { username, email, isActive, role, chipBalance, walletBalance } = req.body;
    const adminId = req.user._id;
    
    // Get user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Store original values for logging
    const originalUser = {
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      role: user.role,
      chipBalance: user.chipBalance,
      walletBalance: user.walletBalance
    };
    
    // Update user fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (isActive !== undefined) user.isActive = isActive;
    if (role) user.role = role;
    
    // Handle balance changes
    let chipBalanceChanged = false;
    let walletBalanceChanged = false;
    
    if (chipBalance !== undefined && chipBalance !== user.chipBalance) {
      const chipDifference = chipBalance - user.chipBalance;
      user.chipBalance = chipBalance;
      chipBalanceChanged = true;
      
      // Create transaction record for chip balance adjustment
      await Transaction.create({
        userId,
        amount: Math.abs(chipDifference),
        type: chipDifference > 0 ? 'BONUS' : 'REFUND',
        status: 'COMPLETED',
        description: `Admin adjustment: ${chipDifference > 0 ? 'Added' : 'Removed'} ${Math.abs(chipDifference)} chips`,
        balanceBefore: originalUser.chipBalance,
        balanceAfter: chipBalance,
        isChipTransaction: true,
        approvedBy: adminId,
        approvedAt: Date.now()
      });
    }
    
    if (walletBalance !== undefined && walletBalance !== user.walletBalance) {
      const walletDifference = walletBalance - user.walletBalance;
      user.walletBalance = walletBalance;
      walletBalanceChanged = true;
      
      // Create transaction record for wallet balance adjustment
      await Transaction.create({
        userId,
        amount: Math.abs(walletDifference),
        type: walletDifference > 0 ? 'BONUS' : 'REFUND',
        status: 'COMPLETED',
        description: `Admin adjustment: ${walletDifference > 0 ? 'Added' : 'Removed'} ${Math.abs(walletDifference)} to wallet`,
        balanceBefore: originalUser.walletBalance,
        balanceAfter: walletBalance,
        isChipTransaction: false,
        approvedBy: adminId,
        approvedAt: Date.now()
      });
    }
    
    // Save user
    await user.save();
    
    // Log admin action
    await AdminLog.create({
      actionType: 'USER_UPDATE',
      actorId: adminId,
      targetId: userId,
      targetModel: 'User',
      details: {
        original: originalUser,
        updated: {
          username: user.username,
          email: user.email,
          isActive: user.isActive,
          role: user.role,
          chipBalance: user.chipBalance,
          walletBalance: user.walletBalance
        },
        chipBalanceChanged,
        walletBalanceChanged
      },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });
    
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get all game tables with pagination
exports.getAllGameTables = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    // Build query
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Get game tables
    const gameTables = await GameTable.find(query)
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count
    const total = await GameTable.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: {
        gameTables,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get game table details
exports.getGameTableDetails = async (req, res, next) => {
  try {
    const { gameTableId } = req.params;
    
    // Get game table
    const gameTable = await GameTable.findById(gameTableId)
      .populate('createdBy', 'username');
    
    if (!gameTable) {
      return res.status(404).json({
        success: false,
        message: 'Game table not found'
      });
    }
    
    // Get participants
    const participants = await GameParticipant.find({ gameTableId })
      .populate('userId', 'username');
    
    // Get transactions
    const transactions = await Transaction.find({ gameTableId })
      .populate('userId', 'username')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: {
        gameTable,
        participants,
        transactions
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get admin dashboard stats
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Get total users
    const totalUsers = await User.countDocuments();
    
    // Get new users in the last 7 days
    const newUsers = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    
    // Get total games
    const totalGames = await GameTable.countDocuments();
    
    // Get active games
    const activeGames = await GameTable.countDocuments({ status: 'ACTIVE' });
    
    // Get total commission
    const commissionStats = await GameTable.aggregate([
      { $group: { _id: null, total: { $sum: '$commissionAmount' } } }
    ]);
    
    const totalCommission = commissionStats.length > 0 ? commissionStats[0].total : 0;
    
    // Get total transactions
    const totalTransactions = await Transaction.countDocuments();
    
    // Get transaction volume
    const transactionVolume = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const totalVolume = transactionVolume.length > 0 ? transactionVolume[0].total : 0;
    
    // Get recent transactions
    const recentTransactions = await Transaction.find()
      .populate('userId', 'username')
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Get recent games
    const recentGames = await GameTable.find()
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.status(200).json({
      success: true,
      data: {
        userStats: {
          total: totalUsers,
          new: newUsers
        },
        gameStats: {
          total: totalGames,
          active: activeGames
        },
        financialStats: {
          totalCommission,
          totalTransactions,
          totalVolume
        },
        recentTransactions,
        recentGames
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get admin logs
exports.getAdminLogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, actionType } = req.query;
    
    // Build query
    let query = {};
    
    if (actionType) {
      query.actionType = actionType;
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Get logs
    const logs = await AdminLog.find(query)
      .populate('actorId', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count
    const total = await AdminLog.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: {
        logs,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get pending transactions
exports.getPendingTransactions = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Get pending transactions
    const transactions = await Transaction.find({ status: 'PENDING' })
      .populate('userId', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count
    const total = await Transaction.countDocuments({ status: 'PENDING' });
    
    res.status(200).json({
      success: true,
      data: {
        transactions,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (err) {
    next(err);
  }
};
