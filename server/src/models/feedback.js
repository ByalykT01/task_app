const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  nickname: {
    type: String,
    default: 'Anonymous user'
  }
}, {
  timestamps: true
})

const Feedback = mongoose.model('Feedback', feedbackSchema)
module.exports = Feedback