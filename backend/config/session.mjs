import session from "express-session"
import config from "./default.mjs"
import MongoStore from "connect-mongo"
export default session({
  secret: config.session.secret,
  store: MongoStore.create({
    mongoUrl: config.db.mongoURI,
    collectionName: "sessions",
    autoRemove: "native",
  }),
  cookie: {
    httpOnly: true,
    maxAge: 3 * 24 * 3600 * 1000, // 3 days
    sameSite: "none",
    secure: true,
  },
  resave: false,
  saveUninitialized: false,
})
