const mongoose = require('mongoose')

const connectDB = async () => {
  try{
  const conn = await mongoose.connect(process.env.MONGODB_URL)
  console.log('connected')
  } catch(e){
    console.log(e)
  }
}
