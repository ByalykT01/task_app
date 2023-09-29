const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const auth = async (req, res, next) => {
  try{
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, '7d3e28a53b914ae4451403779bcc1384b6e210668b2bafa6d69454c8de072226')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if(!user){
      throw new Error()
    }

    req.user = user
    next()
  } catch(e){
    res.status(401).send({ error: "Please, authenticate" })
  }
}

module.exports = auth