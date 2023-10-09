const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth.js')
const Task = require('../models/task')

//task creation

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })
  try{
    await task.save()
    res.status(201).send(task)
  } catch(e){
    res.status(400).send(e)
  }
})

//task list

router.get('/tasks', auth, async (req, res) => {
  const match = {}

  if (req.query.completed) {
      match.completed = req.query.completed === 'true'
  }

  try {
      await req.user.populate({
          path: 'tasks',
          match
      })
      res.send(req.user.tasks)
  } catch (e) {
      res.status(500).send()
  }
})
//task search by ID

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id
  try{
    const task = await Task.findOne({ _id, owner: req.user._id })
    if (!task) {
        return res.status(400).send()
      }
      res.send(task)
  } catch(e){
    res.status(500).send(e)
  }
})

//task update

router.patch('/tasks/:id', auth, async (req, res) => {
  const  updates = Object.keys(req.body)
  const allowedUpdates = [ 'description', 'done' ]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidOperation){
    return res.status(400).send( {error: "Invalid updates!"} )
  }

  try{
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
    

    if(!task){
      return res.status(404).send()
    }
    updates.forEach((update) => task[update] = req.body [update])
    await task.save()
    res.send(task)
  } catch (e){
    res.status(400).send(e)
  }
})

//task removal

router.delete('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id
  try{
  const task = await Task.findOneAndDelete({ _id, owner: req.user._id})
    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  } catch(e){
    res.status(500).send(e)
  }
})

module.exports = router