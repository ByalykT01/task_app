const express = require('express')
const router = new express.Router()
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')
const multer = require('multer')
const sharp = require('sharp')
const { welcomeEmail, farewellEmail } = require('../emails/account.js')

//user creation

router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try{
    await user.save()
    welcomeEmail(user.email, user.name)
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
      farewellEmail(req.user.email, req.user.name)
      res.status(200).send(req.user)
  } catch (error) {
      res.status(500).send(error)
  }
})

//add avatar
const upload = multer({
  limits:{
    fileSize: 10000000
  },
  fileFilter(req, file, cb){
    if(!file.originalname.match(/\.(jpg|gpeg|png)$/)){
      return cb(new Error('Please upload files in jpg, png or jpeg format!'))
    }

    cb(undefined, true)
  }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
  }, (error, req, res, next) => {
    res.status(400).send({error: error.message})
  })

  router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
      await req.user.save()
      res.status(200).send()
  })

  router.get('/users/:id/avatar', async (req, res) => {
    try{
      const user = await User.findById(req.params.id)

      if(!user || !user.avatar){
        throw new Error()
      }

      res.set('Content-Type', 'image/png')
      res.send(user.avatar)
    } catch(error) {
      res.status(404).send()
    }
  })
 

module.exports = router