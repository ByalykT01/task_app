const { MongoClient, ObjectId } = require('mongodb')

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

const dbName = "myProject"

async function main(){
  try{
  await client.connect()
  console.log("Connected succesfully")
  const db = client.db(dbName)

  const deleteDoc = await db.collection('users').deleteMany({
      age: 27
    })
  console.log('delete successful!')
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