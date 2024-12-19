import mongoose from "mongoose"
import config from "../config/default.mjs"
export default async () => {
  try {
    await mongoose.connect(config.db.mongoURI)
    console.log("Successfully connected to DB")
  } catch (error) {
    console.log("Error while connecting to DB")
    console.log(error)
  }
}
