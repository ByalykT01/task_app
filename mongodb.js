const { MongoClient, ObjectId } = require('mongodb')

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

const dbName = "myProject"

async function main(){
  try{
  await client.connect()
  console.log("Connected succesfully")
  const db = client.db(dbName)

  const update = await db.collection('users').updateOne({
      name: 'Oksana'
    },{
      $inc: {
        age: 1
      }
})
  console.log('Update successful!')
  } catch(error) {
  console.error("An error occurred:", error)
  } finally {
  await client.close()
  }
}
main()
.then(() => {
  console.log("Operation completed successfully.")
})
.catch(() => {
  console.log("Operation failed:", error)
})