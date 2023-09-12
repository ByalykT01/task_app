const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/task-manager-api')

// const User = mongoose.model('User', {
//   name: {
//     type: String
//   }, 
//   age: {
//     type: Number
//   }
// })

// const me = new User({
//   name: 'Taras',
//   age: 18
// })

// me.save().then(() => {
//   console.log(me)
// }).catch((error) => {
//   console.log('Error!', error)
// })

const Task = mongoose.model('Task', {
  description: {
    type: String
  },
  done: {
    type: Boolean
  }
})

const newtask = new Task({
  description: 'Watch football',
  done: false
})

newtask.save().then(() => {
  console.log(newtask)
}).catch((error) => {
  console.log('Error', error)
})