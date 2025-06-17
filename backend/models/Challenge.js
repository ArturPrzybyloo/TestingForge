const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Challenge title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Challenge description is required']
  },
  category: {
    type: String,
    required: true,
    enum: ['accessibility', 'security', 'performance', 'usability', 'functionality', 'sql']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  points: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  flag: {
    type: String,
    required: [true, 'Challenge flag is required'],
    trim: true
  },
  hints: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  completionCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better search performance
ChallengeSchema.index({ category: 1, difficulty: 1 });
ChallengeSchema.index({ tags: 1 });

module.exports = mongoose.model('Challenge', ChallengeSchema); 