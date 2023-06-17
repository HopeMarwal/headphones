import mongoose from "mongoose";

let isConnected = false

export const connectToDb = async() => {
  mongoose.set('strictQuery', true)
  // Check if db is already connected
  if(isConnected) {
    console.log('MongoDb is connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'headphones',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    isConnected = true
  } catch (error) {
    console.log(error)
  }
}