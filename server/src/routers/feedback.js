const express = require('express')
const router = new express.Router()
const Feedback = require('../models/feedback')

//feedback

router.get('/feedback', async (req, res) => {
  const feedback = new Feedback({
    ...req.body
  })
  try{
    await feedback.save()
    res.status(201).send(feedback)
  } catch(e){
    res.status(400).send(e)
  }
})

router.get('/feedback/list', async (req, res) => {
  try {
      const feedback = await Feedback.find()
      res.json(feedback)
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
});

module.exports = router