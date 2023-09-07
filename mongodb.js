const { MongoClient } = require('mongodb')

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

const dbName = "myProject"

async function main(){
  await client.connect()
  
  console.log("Connected succesfully")
  const db = client.db(dbName)


   await db.collection('users').insertOne({
    name: 'Taras',
    age: 18
  })

  return "done";
}

main()