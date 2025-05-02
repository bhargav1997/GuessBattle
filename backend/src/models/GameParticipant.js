const mongoose = require('mongoose');

const gameParticipantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  gameTableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GameTable',
    required: [true, 'Game table ID is required']
  },
  guessType: {
    type: String,
    enum: ['EXACT', 'CLOSE', 'EVEN', 'ODD', 'ABOVE_50', 'BELOW_50'],
    required: [true, 'Guess type is required']
  },
  guessedValue: {
    type: Number,
    min: 0,
    max: 99,
    required: function() {
      // Only required if guessType is EXACT or CLOSE
      return this.guessType === 'EXACT' || this.guessType === 'CLOSE';
    }
  },
  chipsBet: {
    type: Number,
    required: [true, 'Chips bet amount is required'],
    min: [1, 'Minimum bet is 1 chip']
  },
  winAmount: {
    type: Number,
    default: 0
  },
  isWinner: {
    type: Boolean,
    default: false
  },
  payoutMultiplier: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Compound index to ensure a user can only have one bet per guess type per game
gameParticipantSchema.index({ userId: 1, gameTableId: 1, guessType: 1 }, { unique: true });

// Index for faster queries
gameParticipantSchema.index({ gameTableId: 1 });
gameParticipantSchema.index({ userId: 1 });

const GameParticipant = mongoose.model('GameParticipant', gameParticipantSchema);

module.exports = GameParticipant;
