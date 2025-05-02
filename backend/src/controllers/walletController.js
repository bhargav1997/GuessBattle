const User = require('../models/User');
const Transaction = require('../models/Transaction');
const AdminLog = require('../models/AdminLog');

// Buy chips with real money
exports.buyChips = async (req, res, next) => {
  try {
    const { amount, paymentMethod, paymentId } = req.body;
    const userId = req.user._id;
    
    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid amount'
      });
    }
    
    // In a real application, you would process the payment with Stripe/PayPal here
    // For now, we'll assume the payment was successful
    
    // Start a session for transaction atomicity
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Get user
      const user = await User.findById(userId).session(session);
      
      if (!user) {
        await session.abortTransaction();
        session.endSession();
        
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      // Calculate chip amount (1:1 ratio for simplicity)
      const chipAmount = amount;
      
      // Create transaction record
      const transaction = await Transaction.create([{
        userId,
        amount: chipAmount,
        type: 'BUY_CHIPS',
        status: 'COMPLETED',
        paymentMethod: paymentMethod || 'CREDIT_CARD',
        paymentId,
        description: `Purchased ${chipAmount} chips`,
        balanceBefore: user.chipBalance,
        balanceAfter: user.chipBalance + chipAmount,
        isChipTransaction: true
      }], { session });
      
      // Update user's chip balance
      user.chipBalance += chipAmount;
      await user.save({ session });
      
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      
      res.status(200).json({
        success: true,
        message: `Successfully purchased ${chipAmount} chips`,
        data: {
          transaction: transaction[0],
          newChipBalance: user.chipBalance
        }
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

// Sell chips (convert back to wallet)
exports.sellChips = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const userId = req.user._id;
    
    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid amount'
      });
    }
    
    // Start a session for transaction atomicity
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Get user
      const user = await User.findById(userId).session(session);
      
      if (!user) {
        await session.abortTransaction();
        session.endSession();
        
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      // Check if user has enough chips
      if (user.chipBalance < amount) {
        await session.abortTransaction();
        session.endSession();
        
        return res.status(400).json({
          success: false,
          message: 'Insufficient chip balance'
        });
      }
      
      // Create transaction record (pending admin approval)
      const transaction = await Transaction.create([{
        userId,
        amount,
        type: 'SELL_CHIPS',
        status: 'PENDING', // Requires admin approval
        description: `Requested to convert ${amount} chips to wallet`,
        balanceBefore: user.chipBalance,
        balanceAfter: user.chipBalance - amount,
        isChipTransaction: true
      }], { session });
      
      // Update user's chip balance (deduct immediately)
      user.chipBalance -= amount;
      await user.save({ session });
      
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      
      res.status(200).json({
        success: true,
        message: `Successfully requested to convert ${amount} chips to wallet. Pending admin approval.`,
        data: {
          transaction: transaction[0],
          newChipBalance: user.chipBalance
        }
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

// Get transaction history
exports.getTransactionHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { type, status, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = { userId };
    
    if (type) query.type = type;
    if (status) query.status = status;
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Get transactions
    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count
    const total = await Transaction.countDocuments(query);
    
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

// Admin: Approve chip sell request
exports.approveChipSell = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const adminId = req.user._id;
    
    // Start a session for transaction atomicity
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Get transaction
      const transaction = await Transaction.findById(transactionId).session(session);
      
      if (!transaction) {
        await session.abortTransaction();
        session.endSession();
        
        return res.status(404).json({
          success: false,
          message: 'Transaction not found'
        });
      }
      
      // Check if transaction is a chip sell request
      if (transaction.type !== 'SELL_CHIPS') {
        await session.abortTransaction();
        session.endSession();
        
        return res.status(400).json({
          success: false,
          message: 'Transaction is not a chip sell request'
        });
      }
      
      // Check if transaction is pending
      if (transaction.status !== 'PENDING') {
        await session.abortTransaction();
        session.endSession();
        
        return res.status(400).json({
          success: false,
          message: 'Transaction is not pending'
        });
      }
      
      // Get user
      const user = await User.findById(transaction.userId).session(session);
      
      if (!user) {
        await session.abortTransaction();
        session.endSession();
        
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      // Update transaction
      transaction.status = 'COMPLETED';
      transaction.approvedBy = adminId;
      transaction.approvedAt = Date.now();
      await transaction.save({ session });
      
      // Update user's wallet balance
      user.walletBalance += transaction.amount;
      await user.save({ session });
      
      // Log admin action
      await AdminLog.create([{
        actionType: 'TRANSACTION_APPROVE',
        actorId: adminId,
        targetId: transaction._id,
        targetModel: 'Transaction',
        details: {
          transactionId: transaction._id,
          userId: user._id,
          amount: transaction.amount,
          type: transaction.type
        },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      }], { session });
      
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      
      res.status(200).json({
        success: true,
        message: 'Chip sell request approved successfully',
        data: {
          transaction
        }
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

// Admin: Reject chip sell request
exports.rejectChipSell = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const { reason } = req.body;
    const adminId = req.user._id;
    
    // Start a session for transaction atomicity
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Get transaction
      const transaction = await Transaction.findById(transactionId).session(session);
      
      if (!transaction) {
        await session.abortTransaction();
        session.endSession();
        
        return res.status(404).json({
          success: false,
          message: 'Transaction not found'
        });
      }
      
      // Check if transaction is a chip sell request
      if (transaction.type !== 'SELL_CHIPS') {
        await session.abortTransaction();
        session.endSession();
        
        return res.status(400).json({
          success: false,
          message: 'Transaction is not a chip sell request'
        });
      }
      
      // Check if transaction is pending
      if (transaction.status !== 'PENDING') {
        await session.abortTransaction();
        session.endSession();
        
        return res.status(400).json({
          success: false,
          message: 'Transaction is not pending'
        });
      }
      
      // Get user
      const user = await User.findById(transaction.userId).session(session);
      
      if (!user) {
        await session.abortTransaction();
        session.endSession();
        
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      // Update transaction
      transaction.status = 'CANCELLED';
      transaction.description += ` | Rejected: ${reason || 'No reason provided'}`;
      await transaction.save({ session });
      
      // Refund chips to user
      user.chipBalance += transaction.amount;
      await user.save({ session });
      
      // Log admin action
      await AdminLog.create([{
        actionType: 'TRANSACTION_REJECT',
        actorId: adminId,
        targetId: transaction._id,
        targetModel: 'Transaction',
        details: {
          transactionId: transaction._id,
          userId: user._id,
          amount: transaction.amount,
          type: transaction.type,
          reason
        },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      }], { session });
      
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      
      res.status(200).json({
        success: true,
        message: 'Chip sell request rejected successfully',
        data: {
          transaction
        }
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (err) {
    next(err);
  }
};
