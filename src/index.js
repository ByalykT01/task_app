const express = require('express')
require('./db/mongoose')
const User = require('./models/user.js')
const Task = require('./models/task.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/user', (req, res) => {
  const user = new User(req.body)

  user.save().then(() => {
    res.status(201).send(user)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

app.get('/users', (req, res) => {
  User.find({}).then((users) => {
    res.status(200).send(users)
  }).catch((e) => {
    res.status(500).send()
  })
})

app.get('/users/:id', (req, res) => {
  const _id = req.params.id
  User.findById(_id).then((iduser) => {
    if(!iduser){
      return res.status(404).send()
    }
    res.send(iduser)
  }).catch((e) => {
    res.status(500).send()
  })
})

app.post('/task', (req, res) => {
  const task = new Task(req.body)

  task.save().then(() => {
    res.status(201).send(task)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

app.get('/tasks', (req, res) => {
  Task.find({}).then((tasks) => {
    res.status(200).send(tasks)
  }).catch((e) => {
    res.status(500).send(e)
  })
})

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id
  Task.findById(_id).then((idtask) => {
    if(!idtask){
      return res.status(400).send()
    }
    res.send(idtask)

  }).catch((e) => {
    res.status(404).send()
  })
})

app.listen(port, () => {
  console.log('Server is up on ' + port)
})