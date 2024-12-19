import session from "express-session"
import config from "./default.mjs"
import MongoStore from "connect-mongo"
export default session({
  secret: config.session.secret,
  store: MongoStore.create({
    mongoUrl: config.db.mongoURI,
    collectionName: "sessions",
    ttl: 60 * 60 * 24 * 3, // 3 days,
    autoRemove: "native",
  }),
  cookie: {
    httpOnly: true,
    maxAge: 3 * 24 * 3600 * 1000, // 3 days
  },
  resave: false,
  saveUninitialized: false,
})
