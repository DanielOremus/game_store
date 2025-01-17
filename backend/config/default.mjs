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
  email: {
    user: process.env.EMAIL_USER,
    senderName: process.env.EMAIL_SENDER,
    password: process.env.EMAIL_PASSWORD,
  },
  tokensAliveTime: {
    passwordReset: {
      hours: 1,
    },
    emailUpdate: {
      hours: 1,
    },
  },
  clientBase: process.env.CLIENT_BASE,
  port: process.env.PORT,
})
