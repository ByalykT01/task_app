const express = require('express')
require('./db/mongoose')
const UserRouter = require('./routers/user.js')
const TaskRouter = require('./routers/task.js')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port, () => {
  console.log('Server is up on ' + port)
})