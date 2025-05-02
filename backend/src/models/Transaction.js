const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  amount: {
    type: Number,
    required: [true, 'Transaction amount is required'],
    min: [0.01, 'Minimum transaction amount is 0.01']
  },
  type: {
    type: String,
    enum: ['BUY_CHIPS', 'SELL_CHIPS', 'WIN', 'COMMISSION', 'ENTRY_FEE', 'REFUND', 'BONUS'],
    required: [true, 'Transaction type is required']
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'],
    default: 'PENDING'
  },
  gameTableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GameTable',
    // Only required for game-related transactions
    required: function() {
      return ['WIN', 'ENTRY_FEE', 'COMMISSION'].includes(this.type);
    }
  },
  paymentMethod: {
    type: String,
    enum: ['CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER', 'CRYPTO', 'INTERNAL'],
    default: 'INTERNAL'
  },
  paymentId: {
    type: String,
    // External payment reference (e.g., Stripe payment ID)
  },
  description: {
    type: String
  },
  balanceBefore: {
    type: Number
  },
  balanceAfter: {
    type: Number
  },
  isChipTransaction: {
    type: Boolean,
    default: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Required for admin-approved transactions like SELL_CHIPS
  },
  approvedAt: {
    type: Date
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Index for faster queries
transactionSchema.index({ userId: 1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ createdAt: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
