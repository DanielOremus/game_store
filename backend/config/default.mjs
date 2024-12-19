import { configDotenv } from "dotenv"
configDotenv()

export default Object.freeze({
  db: {
    databaseName: process.env.DB_NAME,
    databaseUrl: process.env.DB_URL,
    mongoURI: `${process.env.DB_URL}/${process.env.DB_NAME}`,
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  port: process.env.PORT,
})
