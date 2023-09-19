const mongoose = require('mongoose')
const validator = require('validator')

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
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value){
      if(validator.equals(value, 'password')){
        throw new Error('Password must not be \'password\' ')
      }
    }
  }
})

module.exports = User