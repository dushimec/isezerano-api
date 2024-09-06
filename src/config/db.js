import mongoose from 'mongoose'

export const  dbConnection = () =>{
    mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database is ready......"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));
}