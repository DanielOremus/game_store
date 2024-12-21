import express from "express"
import errorHandler from "./middlewares/errorHandler.mjs"
import routes from "./api/v1/routes/index.mjs"
import init from "./middlewares/init.mjs"
import connectDB from "./db/connectDB.mjs"
const app = express()

//Connecting to DB
connectDB()
//Initialization
init(app)
//Routes
app.use("/v1", routes)
//Error handler
errorHandler(app)

export default app
