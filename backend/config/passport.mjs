import passport from "passport"
import LocalStrategy from "../strategies/local.mjs"
import UserManager from "../api/v1/models/user/UserManager.mjs"
passport.use(LocalStrategy)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserManager.findById(id, { password: 0 }, ["role"])
    done(null, user)
  } catch (error) {
    done(err, false)
  }
})

export default passport
