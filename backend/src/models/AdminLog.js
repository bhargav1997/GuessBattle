const mongoose = require('mongoose');

const adminLogSchema = new mongoose.Schema({
  actionType: {
    type: String,
    required: [true, 'Action type is required'],
    enum: [
      'USER_CREATE',
      'USER_UPDATE',
      'USER_DELETE',
      'USER_BAN',
      'USER_UNBAN',
      'GAME_CREATE',
      'GAME_UPDATE',
      'GAME_DELETE',
      'TRANSACTION_APPROVE',
      'TRANSACTION_REJECT',
      'SETTINGS_UPDATE',
      'LOGIN',
      'LOGOUT',
      'OTHER'
    ]
  },
  actorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Actor ID is required']
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    // Can reference any model (User, GameTable, etc.)
  },
  targetModel: {
    type: String,
    enum: ['User', 'GameTable', 'Transaction', 'Settings', null]
  },
  details: {
    type: Object,
    default: {}
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Index for faster queries
adminLogSchema.index({ actionType: 1 });
adminLogSchema.index({ actorId: 1 });
adminLogSchema.index({ createdAt: 1 });

const AdminLog = mongoose.model('AdminLog', adminLogSchema);

module.exports = AdminLog;
