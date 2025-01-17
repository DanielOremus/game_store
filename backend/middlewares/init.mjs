import path from "path"
import cookieParser from "cookie-parser"
import logger from "./logger.mjs"
import { fileURLToPath } from "url"
import express from "express"
import sessionConfig from "../config/session.mjs"
import passport from "../config/passport.mjs"
import mongoSanitize from "express-mongo-sanitize"
import cors from "cors"
import config from "../config/default.mjs"

export default (app) => {
  const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
  const __dirname = path.dirname(__filename) // get the name of the directory

  app.set("views", path.join(__dirname, "../views"))
  app.set("view engine", "ejs")

  app.use(
    mongoSanitize({
      allowDots: true,
    })
  )

  logger(app)

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, "../public")))
  app.use("/uploads/", express.static(path.join(__dirname, "../uploads")))

  //Session + Cookies + Passport
  app.use(sessionConfig)
  app.use(passport.initialize())
  app.use(passport.session())

  //Cors
  app.use(
    cors({
      credentials: true,
      origin: config.clientBase,
    })
  )
}
