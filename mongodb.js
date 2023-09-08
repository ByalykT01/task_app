const { MongoClient, ObjectId } = require('mongodb')

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

const dbName = "myProject"

async function main(){
  try{
  await client.connect()
  console.log("Connected succesfully")
  const db = client.db(dbName)
  const collection = db.collection('tasks')

  const last = await collection.findOne(
    {
      _id: new ObjectId('64fa081e107d47fa78bf32c5')
    }
  )
  if(last){
    console.log(last)
  }
  else{
    console.log("Error")
  }

  const done = await collection.find(
    {
      done: false
    }
  ).toArray()

  if(done){
    console.log(done)
  }
  else{
    console.log("Error")
  }

  

  } catch(error) {
  console.error("An error occured:", error)
  } finally {
  await client.close()
  }
}
main()