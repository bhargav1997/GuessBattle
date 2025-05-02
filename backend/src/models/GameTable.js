const mongoose = require('mongoose');

const gameTableSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['WAITING', 'ACTIVE', 'COMPLETED'],
    default: 'WAITING'
  },
  entryFee: {
    type: Number,
    required: [true, 'Entry fee is required'],
    min: [0, 'Entry fee cannot be negative']
  },
  potAmount: {
    type: Number,
    default: 0,
    min: [0, 'Pot amount cannot be negative']
  },
  generatedNumber: {
    type: Number,
    min: 0,
    max: 99
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Game table must have a creator']
  },
  minPlayers: {
    type: Number,
    default: 2,
    min: [2, 'Minimum players must be at least 2']
  },
  maxPlayers: {
    type: Number,
    default: 10,
    max: [20, 'Maximum players cannot exceed 20']
  },
  commissionRate: {
    type: Number,
    default: 5, // 5% commission by default
    min: [0, 'Commission rate cannot be negative'],
    max: [20, 'Commission rate cannot exceed 20%']
  },
  commissionAmount: {
    type: Number,
    default: 0
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  accessCode: {
    type: String,
    select: false // Don't include access code in query results by default
  },
  participantCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Virtual field for calculating total pot (sum of all bets)
gameTableSchema.virtual('totalPot').get(function() {
  return this.potAmount;
});

// Index for faster queries
gameTableSchema.index({ status: 1 });
gameTableSchema.index({ createdBy: 1 });

const GameTable = mongoose.model('GameTable', gameTableSchema);

module.exports = GameTable;
