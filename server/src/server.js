const express = require('express')
const cors = require('cors')
const UserRouter = require('./routers/user.js')
const TaskRouter = require('./routers/task.js')
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
app.use(cors())
const port = process.env.PORT

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)


connectDB().then(() => {
  app.listen(port, () => {
    console.log('Server is up on ' + port)
  })
})