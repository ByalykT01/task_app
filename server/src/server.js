const express = require('express');
const cors = require('cors');
const UserRouter = require('./routers/user.js');
const TaskRouter = require('./routers/task.js');
const FeedbackRouter = require('./routers/feedback.js');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = ['https://task-app-byalykt-frontend.onrender.com', 'http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
}));
app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);
app.use(FeedbackRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Error starting the server:', error);
  });

module.exports = app;