import UserManager from "../models/user/UserManager.mjs"
import { validationResult } from "express-validator"
import RoleManager from "../models/role/RoleManager.mjs"
import passport from "../../../config/passport.mjs"
import { logoutAsync } from "../../../utils/auth.mjs"

class AuthController {
  static async signup(req, res) {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     success: false,
    //     errors: errors.array(),
    //   })
    // }
    const { email, firstName, lastName, password } = req.body
    try {
      const guestRole = await RoleManager.findOne(
        { title: "Guest" },
        { _id: 1 }
      )

      const user = await UserManager.create({
        email,
        firstName,
        lastName,
        password,
        role: guestRole,
      })
      req.login(user, (err) => {
        if (err)
          return res.status(500).json({ success: false, msg: err.message })
        res.json({
          success: true,
          data: {
            user: { id: user._id, fullName: user.fullName },
          },
        })
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      })
    }
  }
  static login(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      })
    }

    passport.authenticate("local", (err, user, info) => {
      if (err) return res.status(500).json({ success: false, msg: err.message })
      if (!user)
        return res.status(400).json({ success: false, msg: info.message })
      req.login(user, (err) => {
        if (err)
          return res.status(500).json({ success: false, msg: err.message })
        res.json({
          success: true,
          data: {
            user: { id: user._id, fullName: user.fullName },
          },
        })
      })
    })(req, res)
  }
  static async getPagesPermissions(req, res) {
    try {
      const user = await UserManager.findById(req.user._id, {}, ["role"])

      res.json({
        success: true,
        data: {
          pagesPermissions: user.role.pagesPermissions,
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      })
    }
  }
  static async logout(req, res) {
    try {
      await logoutAsync(req)
      res.json({ success: true, msg: "Successfully logged out" })
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      })
    }
  }
}

export default AuthController
