const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema(
  {
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
      unique: true,
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
    },
    tokens: [{
      token:{
        type: String,
        required: true
      }
    }]
  }, {
    timestamps: true
  })

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function() {
  const user = this 
  const token = jwt.sign({ _id: user._id.toString() }, '7d3e28a53b914ae4451403779bcc1384b6e210668b2bafa6d69454c8de072226')
  
  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.methods.toJSON =  function() {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if(!user){
    throw new Error('Unable to log in')
  }
  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch){
    throw new Error('Unable to log in')
  }
  return user
}

//Hash password before saving

userSchema.pre('save', async function (next){
  const user = this
  
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  const user = this;
  try{
   await Task.deleteMany({ owner: user._id });
   next();
  }catch{
  }
})

userSchema.pre('remove', async function (next){
  const user = this
  await Task.deleteMany({ owner: user._id })
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User