const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../models/User');
const GameTable = require('../models/GameTable');
const GameParticipant = require('../models/GameParticipant');
const Transaction = require('../models/Transaction');
const AdminLog = require('../models/AdminLog');

// Create a new game table
exports.createGameTable = async (req, res, next) => {
  try {
    const { entryFee, minPlayers, maxPlayers, isPrivate, commissionRate } = req.body;
    const userId = req.user._id;
    
    // Validate entry fee
    if (!entryFee || entryFee <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid entry fee'
      });
    }
    
    // Check if user has enough chips
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (user.chipBalance < entryFee) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient chip balance'
      });
    }
    
    // Generate access code for private tables
    let accessCode;
    if (isPrivate) {
      accessCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    }
    
    // Start a session for transaction atomicity
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Create game table
      const gameTable = await GameTable.create([{
        entryFee,
        createdBy: userId,
        minPlayers: minPlayers || 2,
        maxPlayers: maxPlayers || 10,
        isPrivate: isPrivate || false,
        accessCode,
        commissionRate: commissionRate || 5
      }], { session });
      
      // Deduct entry fee from user's chip balance
      user.chipBalance -= entryFee;
      await user.save({ session });
      
      // Create transaction record
      await Transaction.create([{
        userId,
        amount: entryFee,
        type: 'ENTRY_FEE',
        status: 'COMPLETED',
        gameTableId: gameTable[0]._id,
        description: `Entry fee for game table ${gameTable[0]._id}`,
        balanceBefore: user.chipBalance + entryFee,
        balanceAfter: user.chipBalance,
        isChipTransaction: true
      }], { session });
      
      // Add user as participant
      await GameParticipant.create([{
        userId,
        gameTableId: gameTable[0]._id,
        guessType: 'EXACT', // Default guess type
        chipsBet: entryFee
      }], { session });
      
      // Update game table pot amount and participant count
      gameTable[0].potAmount += entryFee;
      gameTable[0].participantCount += 1;
      await gameTable[0].save({ session });
      
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      
      res.status(201).json({
        success: true,
        message: 'Game table created successfully',
        data: {
          gameTable: gameTable[0],
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

// Join a game table
exports.joinGameTable = async (req, res, next) => {
  try {
    const { gameTableId, accessCode } = req.body;
    const userId = req.user._id;
    
    // Get game table
    const gameTable = await GameTable.findById(gameTableId);
    
    if (!gameTable) {
      return res.status(404).json({
        success: false,
        message: 'Game table not found'
      });
    }
    
    // Check if game table is waiting for players
    if (gameTable.status !== 'WAITING') {
      return res.status(400).json({
        success: false,
        message: 'Game has already started or ended'
      });
    }
    
    // Check if game table is full
    if (gameTable.participantCount >= gameTable.maxPlayers) {
      return res.status(400).json({
        success: false,
        message: 'Game table is full'
      });
    }
    
    // Check if game table is private and requires access code
    if (gameTable.isPrivate) {
      // Get access code from database
      const tableWithCode = await GameTable.findById(gameTableId).select('+accessCode');
      
      if (!accessCode || accessCode !== tableWithCode.accessCode) {
        return res.status(401).json({
          success: false,
          message: 'Invalid access code'
        });
      }
    }
    
    // Check if user is already a participant
    const existingParticipant = await GameParticipant.findOne({
      userId,
      gameTableId
    });
    
    if (existingParticipant) {
      return res.status(400).json({
        success: false,
        message: 'You are already a participant in this game'
      });
    }
    
    // Get user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if user has enough chips
    if (user.chipBalance < gameTable.entryFee) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient chip balance'
      });
    }
    
    // Start a session for transaction atomicity
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Deduct entry fee from user's chip balance
      user.chipBalance -= gameTable.entryFee;
      await user.save({ session });
      
      // Create transaction record
      await Transaction.create([{
        userId,
        amount: gameTable.entryFee,
        type: 'ENTRY_FEE',
        status: 'COMPLETED',
        gameTableId,
        description: `Entry fee for game table ${gameTableId}`,
        balanceBefore: user.chipBalance + gameTable.entryFee,
        balanceAfter: user.chipBalance,
        isChipTransaction: true
      }], { session });
      
      // Add user as participant
      await GameParticipant.create([{
        userId,
        gameTableId,
        guessType: 'EXACT', // Default guess type
        chipsBet: gameTable.entryFee
      }], { session });
      
      // Update game table pot amount and participant count
      gameTable.potAmount += gameTable.entryFee;
      gameTable.participantCount += 1;
      await gameTable.save({ session });
      
      // Check if game should start (minimum players reached)
      if (gameTable.participantCount >= gameTable.minPlayers) {
        // Schedule game start in 30 seconds
        // In a real application, you would use a job queue like Bull
        // For now, we'll just update the status
        gameTable.status = 'ACTIVE';
        gameTable.startTime = Date.now();
        await gameTable.save({ session });
        
        // In a real application, you would schedule the game end here
        // For example, using setTimeout or a job queue
      }
      
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      
      res.status(200).json({
        success: true,
        message: 'Joined game table successfully',
        data: {
          gameTable,
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

// Place a guess
exports.placeGuess = async (req, res, next) => {
  try {
    const { gameTableId, guessType, guessedValue } = req.body;
    const userId = req.user._id;
    
    // Validate guess type
    const validGuessTypes = ['EXACT', 'CLOSE', 'EVEN', 'ODD', 'ABOVE_50', 'BELOW_50'];
    if (!validGuessTypes.includes(guessType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid guess type'
      });
    }
    
    // Validate guessed value for EXACT and CLOSE types
    if ((guessType === 'EXACT' || guessType === 'CLOSE') && (guessedValue === undefined || guessedValue < 0 || guessedValue > 99)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid guessed value (0-99)'
      });
    }
    
    // Get game table
    const gameTable = await GameTable.findById(gameTableId);
    
    if (!gameTable) {
      return res.status(404).json({
        success: false,
        message: 'Game table not found'
      });
    }
    
    // Check if game is active
    if (gameTable.status !== 'ACTIVE') {
      return res.status(400).json({
        success: false,
        message: 'Game is not active'
      });
    }
    
    // Check if user is a participant
    const participant = await GameParticipant.findOne({
      userId,
      gameTableId
    });
    
    if (!participant) {
      return res.status(400).json({
        success: false,
        message: 'You are not a participant in this game'
      });
    }
    
    // Check if user already placed a guess of this type
    const existingGuess = await GameParticipant.findOne({
      userId,
      gameTableId,
      guessType
    });
    
    if (existingGuess) {
      return res.status(400).json({
        success: false,
        message: `You already placed a ${guessType} guess`
      });
    }
    
    // Update participant's guess
    participant.guessType = guessType;
    if (guessType === 'EXACT' || guessType === 'CLOSE') {
      participant.guessedValue = guessedValue;
    }
    await participant.save();
    
    res.status(200).json({
      success: true,
      message: 'Guess placed successfully',
      data: {
        participant
      }
    });
  } catch (err) {
    next(err);
  }
};

// Generate random number and evaluate winners
exports.evaluateGame = async (req, res, next) => {
  try {
    const { gameTableId } = req.params;
    
    // Get game table
    const gameTable = await GameTable.findById(gameTableId);
    
    if (!gameTable) {
      return res.status(404).json({
        success: false,
        message: 'Game table not found'
      });
    }
    
    // Check if game is active
    if (gameTable.status !== 'ACTIVE') {
      return res.status(400).json({
        success: false,
        message: 'Game is not active'
      });
    }
    
    // Generate random number (0-99)
    const randomNumber = crypto.randomInt(0, 100);
    
    // Start a session for transaction atomicity
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Update game table
      gameTable.generatedNumber = randomNumber;
      gameTable.status = 'COMPLETED';
      gameTable.endTime = Date.now();
      
      // Calculate commission
      const commissionAmount = (gameTable.potAmount * gameTable.commissionRate) / 100;
      gameTable.commissionAmount = commissionAmount;
      
      // Calculate remaining pot after commission
      const remainingPot = gameTable.potAmount - commissionAmount;
      
      // Get all participants
      const participants = await GameParticipant.find({ gameTableId }).session(session);
      
      // Evaluate winners
      const exactWinners = [];
      const closeWinners = [];
      const conditionWinners = [];
      
      participants.forEach(participant => {
        // Check EXACT match
        if (participant.guessType === 'EXACT' && participant.guessedValue === randomNumber) {
          exactWinners.push(participant);
        }
        // Check CLOSE match (±5)
        else if (participant.guessType === 'CLOSE' && 
                Math.abs(participant.guessedValue - randomNumber) <= 5) {
          closeWinners.push(participant);
        }
        // Check EVEN/ODD
        else if ((participant.guessType === 'EVEN' && randomNumber % 2 === 0) ||
                (participant.guessType === 'ODD' && randomNumber % 2 !== 0)) {
          conditionWinners.push(participant);
        }
        // Check ABOVE_50/BELOW_50
        else if ((participant.guessType === 'ABOVE_50' && randomNumber > 50) ||
                (participant.guessType === 'BELOW_50' && randomNumber <= 50)) {
          conditionWinners.push(participant);
        }
      });
      
      // Distribute winnings based on priority
      let distributedAmount = 0;
      
      // 1. EXACT winners get 80% of remaining pot
      if (exactWinners.length > 0) {
        const exactWinningsPool = remainingPot * 0.8;
        const winPerExact = exactWinningsPool / exactWinners.length;
        
        for (const winner of exactWinners) {
          winner.isWinner = true;
          winner.payoutMultiplier = winPerExact / winner.chipsBet;
          winner.winAmount = winPerExact;
          await winner.save({ session });
          
          // Update user's chip balance
          const user = await User.findById(winner.userId).session(session);
          user.chipBalance += winPerExact;
          await user.save({ session });
          
          // Create transaction record
          await Transaction.create([{
            userId: winner.userId,
            amount: winPerExact,
            type: 'WIN',
            status: 'COMPLETED',
            gameTableId,
            description: `Won ${winPerExact} chips with EXACT guess in game ${gameTableId}`,
            balanceBefore: user.chipBalance - winPerExact,
            balanceAfter: user.chipBalance,
            isChipTransaction: true
          }], { session });
          
          distributedAmount += winPerExact;
        }
      }
      
      // 2. CLOSE winners get 30% of remaining pot
      if (closeWinners.length > 0) {
        const closeWinningsPool = remainingPot * 0.3;
        const winPerClose = closeWinningsPool / closeWinners.length;
        
        for (const winner of closeWinners) {
          winner.isWinner = true;
          winner.payoutMultiplier = winPerClose / winner.chipsBet;
          winner.winAmount = winPerClose;
          await winner.save({ session });
          
          // Update user's chip balance
          const user = await User.findById(winner.userId).session(session);
          user.chipBalance += winPerClose;
          await user.save({ session });
          
          // Create transaction record
          await Transaction.create([{
            userId: winner.userId,
            amount: winPerClose,
            type: 'WIN',
            status: 'COMPLETED',
            gameTableId,
            description: `Won ${winPerClose} chips with CLOSE guess in game ${gameTableId}`,
            balanceBefore: user.chipBalance - winPerClose,
            balanceAfter: user.chipBalance,
            isChipTransaction: true
          }], { session });
          
          distributedAmount += winPerClose;
        }
      }
      
      // 3. Condition winners (EVEN/ODD, ABOVE_50/BELOW_50) get 10% of remaining pot
      if (conditionWinners.length > 0) {
        const conditionWinningsPool = remainingPot * 0.1;
        const winPerCondition = conditionWinningsPool / conditionWinners.length;
        
        for (const winner of conditionWinners) {
          winner.isWinner = true;
          winner.payoutMultiplier = winPerCondition / winner.chipsBet;
          winner.winAmount = winPerCondition;
          await winner.save({ session });
          
          // Update user's chip balance
          const user = await User.findById(winner.userId).session(session);
          user.chipBalance += winPerCondition;
          await user.save({ session });
          
          // Create transaction record
          await Transaction.create([{
            userId: winner.userId,
            amount: winPerCondition,
            type: 'WIN',
            status: 'COMPLETED',
            gameTableId,
            description: `Won ${winPerCondition} chips with ${winner.guessType} guess in game ${gameTableId}`,
            balanceBefore: user.chipBalance - winPerCondition,
            balanceAfter: user.chipBalance,
            isChipTransaction: true
          }], { session });
          
          distributedAmount += winPerCondition;
        }
      }
      
      // Record commission transaction
      if (commissionAmount > 0) {
        await Transaction.create([{
          userId: gameTable.createdBy,
          amount: commissionAmount,
          type: 'COMMISSION',
          status: 'COMPLETED',
          gameTableId,
          description: `Commission from game ${gameTableId}`,
          isChipTransaction: true
        }], { session });
      }
      
      // Save game table
      await gameTable.save({ session });
      
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      
      res.status(200).json({
        success: true,
        message: 'Game evaluated successfully',
        data: {
          gameTable,
          winningNumber: randomNumber,
          exactWinners: exactWinners.length,
          closeWinners: closeWinners.length,
          conditionWinners: conditionWinners.length,
          distributedAmount,
          commissionAmount
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

// Get game details
exports.getGameDetails = async (req, res, next) => {
  try {
    const { gameTableId } = req.params;
    
    // Get game table with populated creator
    const gameTable = await GameTable.findById(gameTableId)
      .populate('createdBy', 'username');
    
    if (!gameTable) {
      return res.status(404).json({
        success: false,
        message: 'Game table not found'
      });
    }
    
    // Get participants with populated users
    const participants = await GameParticipant.find({ gameTableId })
      .populate('userId', 'username');
    
    res.status(200).json({
      success: true,
      data: {
        gameTable,
        participants
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get active game tables
exports.getActiveGameTables = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Get active game tables
    const gameTables = await GameTable.find({ status: 'ACTIVE' })
      .populate('createdBy', 'username')
      .sort({ startTime: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count
    const total = await GameTable.countDocuments({ status: 'ACTIVE' });
    
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

// Get waiting game tables
exports.getWaitingGameTables = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Get waiting game tables
    const gameTables = await GameTable.find({ 
      status: 'WAITING',
      isPrivate: false // Only show public tables
    })
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count
    const total = await GameTable.countDocuments({ 
      status: 'WAITING',
      isPrivate: false
    });
    
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

// Get user's game history
exports.getUserGameHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Get user's game participations
    const participations = await GameParticipant.find({ userId })
      .populate({
        path: 'gameTableId',
        select: 'status generatedNumber startTime endTime potAmount commissionAmount'
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count
    const total = await GameParticipant.countDocuments({ userId });
    
    // Calculate stats
    const totalWins = await GameParticipant.countDocuments({ 
      userId,
      isWinner: true
    });
    
    const totalGames = total;
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
        participations,
        stats: {
          totalGames,
          totalWins,
          winRate: winRate.toFixed(2),
          totalWinnings
        },
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
