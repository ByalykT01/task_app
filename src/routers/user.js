const express = require('express')
const router = new express.Router()
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')
const multer = require('multer')

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

router.patch('/users/me', auth,  async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age'] 
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidOperation){
    return res.status(400).send( {error: "Invalid updates!"} )
  }
  try{
    updates.forEach((update) => req.user[update] = req.body[update])

    await req.user.save()
    res.send(req.user)
  } catch (e){
    res.status(400).send(e)
  }
})

//user removal

router.delete('/users/me', auth, async (req, res) => {
  try {
      await req.user.deleteOne()
      res.status(200).send(req.user)
  } catch (error) {
      res.status(500).send(error)
  }
})

//add avatar
const upload = multer({
  dest: 'avatars'
})

router.post('/me/avatar', auth, upload.single('avatar'), async (req, res) =>{
  try{
    await res.status(200).send()
  } catch (error) {
    res.status(500).send(error)
  }
}) 

module.exports = router