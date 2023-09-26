const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

//task creation

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body)
  try{
    await task.save()
    res.status(201).send(task)
  } catch(e){
    res.status(400).send(e)
  }
})

//task list

router.get('/tasks', async (req, res) => {
  try{
    const tasks = await Task.find({})
    res.status(200).send(tasks)
  } catch(e){
    res.status(500).send(e)
  }
})

//task search by ID

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id
  try{
    const task = await Task.findById(_id)
    if (!task) {
        return res.status(400).send()
      }
      res.send(task)
  } catch(e){
    res.status(500).send(e)
  }
})

//task update

router.patch('/tasks/:id', async (req, res) => {
  const  updates = Object.keys(req.body)
  const allowedUpdates = [ 'description', 'done' ]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidOperation){
    return res.status(400).send( {error: "Invalid updates!"} )
  }

  const _id = req.params.id

  try{
    const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  } catch (e){
    res.status(400).send(e)
  }
})

//task removal

router.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id
  try{
  const task = await Task.findByIdAndDelete(_id)
    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  } catch(e){
    res.status(500).send(e)
  }
})

module.exports = router