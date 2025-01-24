import UserManager from "../models/user/UserManager.mjs"
import { validationResult } from "express-validator"
import RoleManager from "../models/role/RoleManager.mjs"
import passport from "../../../config/passport.mjs"
import { logoutAsync } from "../../../utils/auth.mjs"
import crypto from "crypto"
import ResetTokenManager from "../models/resetToken/ResetTokenManager.mjs"
import config from "../../../config/default.mjs"
import sendEmail from "../../../utils/sendEmail.mjs"
import ejs from "ejs"

class AuthController {
  static isAuthenticated(req, res) {
    return req.isAuthenticated()
      ? res.json({
          success: true,
          data: {
            id: req.user._id,
            fullName: req.user.fullName,
          },
          msg: "User is authenticated",
        })
      : res
          .status(401)
          .json({ success: false, msg: "User is not authenticated" })
  }

  static async signup(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      })
    }
    const { email, firstName, lastName, password } = req.body
    try {
      const guestRole = await RoleManager.findOne(
        { title: "Guest" },
        { _id: 1 }
      )

      const user = await UserManager.create({
        email: email.toLowerCase(),
        firstName,
        lastName,
        password,
        role: guestRole,
      })
      req.login(user, (err) => {
        if (err)
          return res.status(500).json({ success: false, msg: err.message })
        res.status(201).json({
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
        return res.status(401).json({ success: false, msg: info.message })
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

  static async generateResetToken(req, res) {
    const { email } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }
    try {
      const user = await UserManager.findOne({ email: { $eq: email } })
      if (!user)
        return res
          .status(404)
          .json({ success: false, msg: "User by email not found" })
      let resetToken = await ResetTokenManager.findOne({ userId: user._id })

      if (!resetToken) {
        resetToken = await ResetTokenManager.create({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        })
      }
      const resetLink = `${config.clientBase}/auth/reset-password/${resetToken.token}`
      const letterContent = await ejs.renderFile("views/resetPassword.ejs", {
        firstName: user.firstName,
        link: resetLink,
        activeHoursTime: config.tokensAliveTime.passwordReset.hours,
        date: new Date().toUTCString(),
      })
      await sendEmail(email, "Password reset", letterContent)
      res.json({ success: true, msg: "Email was sent successfully" })
    } catch (error) {
      console.log(error)

      res.status(500).json({ success: false, msg: error.message })
    }
  }

  static async validateResetToken(req, res) {
    const { token } = req.body
    try {
      const exists = await ResetTokenManager.findOne({
        token: { $eq: token },
      })
      if (!exists)
        return res
          .status(400)
          .json({ success: false, msg: "Invalid or expired token" })
      res.json({ success: true, msg: "Token is valid" })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }

  static async resetPassword(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }
    const { newPassword, token } = req.body
    try {
      const exists = await ResetTokenManager.findOne({
        token: { $eq: token },
      })
      if (!exists)
        return res
          .status(400)
          .json({ success: false, msg: "Invalid link or expired" })

      await UserManager.updateById(exists.userId, { password: newPassword })
      await ResetTokenManager.deleteOne({ token: { $eq: token } })
      res.json({ success: true, msg: "Password has been changed successfully" })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}

export default AuthController
