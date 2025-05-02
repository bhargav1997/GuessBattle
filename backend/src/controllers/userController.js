const User = require('../models/User');
const GameParticipant = require('../models/GameParticipant');
const Transaction = require('../models/Transaction');

// Get current user profile
exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    
    // Get user
    const user = await User.findById(userId).select('-passwordHash');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
};

// Update current user profile
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { username, email } = req.body;
    
    // Get user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if username is already taken
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username is already taken'
        });
      }
      
      user.username = username;
    }
    
    // Check if email is already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email is already taken'
        });
      }
      
      user.email = email;
      user.isEmailVerified = false;
      
      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
      
      user.verificationToken = verificationToken;
      user.verificationTokenExpires = verificationTokenExpires;
      
      // Send verification email
      const verificationURL = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;
      
      const message = `Please verify your new email address by clicking the link: ${verificationURL}`;
      
      try {
        await sendEmail({
          email: user.email,
          subject: 'GuessBattle - Verify Your New Email',
          message
        });
      } catch (err) {
        // If email sending fails, still update the user but inform them
        return res.status(200).json({
          success: true,
          message: 'Profile updated but verification email could not be sent. Please contact support.',
          data: {
            user
          }
        });
      }
    }
    
    // Save user
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
};

// Change password
exports.changePassword = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;
    
    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current password and new password'
      });
    }
    
    // Get user
    const user = await User.findById(userId).select('+passwordHash');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if current password is correct
    if (!(await user.correctPassword(currentPassword))) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    // Update password
    user.passwordHash = newPassword;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (err) {
    next(err);
  }
};

// Get user stats
exports.getUserStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    
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
    
    // Get recent games
    const recentGames = await GameParticipant.find({ userId })
      .populate({
        path: 'gameTableId',
        select: 'status generatedNumber startTime endTime potAmount'
      })
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get recent transactions
    const recentTransactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalGames,
          totalWins,
          winRate: winRate.toFixed(2),
          totalWinnings
        },
        recentGames,
        recentTransactions
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get leaderboard
exports.getLeaderboard = async (req, res, next) => {
  try {
    const { timeframe = 'all', limit = 10 } = req.query;
    
    // Build date filter based on timeframe
    let dateFilter = {};
    
    if (timeframe === 'weekly') {
      dateFilter = { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
    } else if (timeframe === 'monthly') {
      dateFilter = { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } };
    }
    
    // Aggregate to get top winners
    const leaderboard = await GameParticipant.aggregate([
      { $match: { isWinner: true, ...dateFilter } },
      { $group: { 
        _id: '$userId', 
        totalWinnings: { $sum: '$winAmount' },
        gamesWon: { $sum: 1 }
      }},
      { $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }},
      { $unwind: '$user' },
      { $lookup: {
        from: 'gameparticipants',
        localField: '_id',
        foreignField: 'userId',
        as: 'games'
      }},
      { $project: {
        _id: 1,
        username: '$user.username',
        totalWinnings: 1,
        gamesWon: 1,
        gamesPlayed: { $size: '$games' },
        winRate: { 
          $multiply: [
            { $divide: ['$gamesWon', { $size: '$games' }] },
            100
          ]
        }
      }},
      { $sort: { totalWinnings: -1 } },
      { $limit: parseInt(limit) }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        leaderboard,
        timeframe
      }
    });
  } catch (err) {
    next(err);
  }
};
