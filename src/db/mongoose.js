const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://localhost:27017/task-manager-api')

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  }, 
  age: {
    type: Number,
    default: null,
    validate(value) {
      if(value < 0){
        throw new Error('Age must be a positive number')
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('That is not an email address')
      }
    },
  }
})

const me = new User({
  name: 'Andriy',
  email: 'weqwew@hotmail.com'
})

me.save().then(() => {
  console.log(me)
}).catch((error) => {
  console.log('Error!', error)
})



// const newtask = new Task({
//   description: 'Watch football',
//   done: false
// })

// newtask.save().then(() => {
//   console.log(newtask)
// }).catch((error) => {
//   console.log('Error', error)
// })