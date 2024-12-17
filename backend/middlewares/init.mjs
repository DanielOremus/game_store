import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import { fileURLToPath } from "url"
import express from "express"

export default (app) => {
  const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
  const __dirname = path.dirname(__filename) // get the name of the directory
  app.set("views", path.join(__dirname, "../views"))
  app.set("view engine", "ejs")

  app.use(logger("dev"))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, "../public")))
}
