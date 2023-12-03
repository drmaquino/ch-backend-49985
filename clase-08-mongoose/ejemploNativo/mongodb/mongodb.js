import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = "mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

await client.connect()

const db = client.db("coderhouse")

export const dbPersonas = db.collection('personas')
export const dbProductos = db.collection('productos')


