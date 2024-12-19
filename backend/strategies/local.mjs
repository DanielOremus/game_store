import { Strategy as LocalStrategy } from "passport-local"
import UserManager from "../api/v1/models/user/UserManager.mjs"

export default new LocalStrategy(
  { usernameField: "email" },
  async (username, password, done) => {
    try {
      const user = await UserManager.findOne({ email: username })
      if (!user)
        return done(null, false, { message: "Incorrect email or password" })
      const isValid = await user.validatePassword(password)
      if (!isValid)
        return done(null, false, { message: "Incorrect email or password" })
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  }
)
