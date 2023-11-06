const express = require('express')
const cors = require('cors')
const UserRouter = require('./routers/user.js')
const TaskRouter = require('./routers/task.js')
const FeedbackRouter = require('./routers/feedback.js')

const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    console.log('connected')
  } catch (e) {
    console.log(e)
  }
}

const app = express()
app.use(cors({
  origin: ['http://localhost:5000', 'http://task-app-byalykt.onrender.com']
}))
const port = process.env.PORT

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)
app.use(FeedbackRouter)


connectDB().then(() => {
  app.listen(port, () => {
    console.log('Server is up on ' + port)
  })
})