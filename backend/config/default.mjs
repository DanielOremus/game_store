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
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  email: {
    user: process.env.EMAIL_USER,
    senderName: process.env.EMAIL_SENDER,
    password: process.env.EMAIL_PASSWORD,
  },
  baseUrl: process.env.BASE_URL,
  port: process.env.PORT,
})
