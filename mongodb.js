const { MongoClient } = require('mongodb')

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

const dbName = "myProject"

async function main(){
  try{
  await client.connect()
  
  console.log("Connected succesfully")

  const db = client.db(dbName)

  // const result = await db.collection('users').insertOne({
  //   name: 'Taras',
  //   age: 18
  // })

  //   console.log(result.insertedId)

  // const result = await db.collection('users').insertMany([
  //   {
  //     name: 'Bob',
  //     age: 27
  //   },
  //   {
  //     name: 'Jessie',
  //     age: 24
  //   }
  // ])

  // console.log(result.insertedIds)

  const result = await db.collection('tasks').insertMany([
    {
      description: 'Polish lesson',
      done: true
    }, {
      desciption: 'Daily walk',
      done: false
    }, {
      description: 'Get fired',
      done: true
    }
  ])
  
  console.log(result.insertedIds)
  } catch(error) {
  console.error("An error occured:", error)
  } finally {
  await client.close()
  }
}
main()