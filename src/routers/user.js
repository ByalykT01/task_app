const express = require('express')
const router = new express.Router()
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')

//user creation

router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try{
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({user, token})
  } catch(e) {
    res.status(400).send(e)
  }
})

//find by credentials

router.post('/users/login', async (req, res) => {
  try{
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch(e){
    res.status(400).send(e)
  }
})

//logout

router.post('/users/logout', auth, async (req, res) => {
  try{
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
    })
    await req.user.save()

    res.status(200).send()
  } catch(e){
    res.status(500).send()
  }
})

//logoutall

router.post('/users/logoutall', auth, async (req, res) => {
  try{
    req.user.tokens = []
    await req.user.save()
    res.status(200).send()
  } catch(e){
    res.status(500).send()
  }
})

//user list

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

//task update

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age'] 
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidOperation){
    return res.status(400).send( {error: "Invalid updates!"} )
  }
  try{
    const user = await User.findById(req.params.id)

    updates.forEach((update) => user[update] = req.body[update])

    await user.save()

    if(!user){
      return res.status(404).send()
    }
    res.send(user)
  } catch (e){
    res.status(400).send(e)
  }
})

//user removal

router.delete('/users/:id', async (req, res) => {
  const _id = req.params.id
  try{
    const user = await User.findByIdAndDelete(_id)
    if(!user){
      return res.status(404).send()
    }
    res.send(user)
  } catch(e){
    res.status(500).send()
  }

})

module.exports = router