const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/task-manager-api')

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  done: {
    type: Boolean,
    default: false
  }
})