import UserManager from "../models/user/UserManager.mjs"
import { validationResult } from "express-validator"
import RoleManager from "../models/role/RoleManager.mjs"
import crypto from "crypto"
import ResetTokenManager from "../models/resetToken/ResetTokenManager.mjs"
import config from "../../../config/default.mjs"
import sendEmail from "../../../utils/sendEmail.mjs"
import ejs from "ejs"
import jwtHelper from "../../../utils/jwtHelper.mjs"

class AuthController {
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
      console.log(password)

      const user = await UserManager.create({
        email,
        firstName,
        lastName,
        password,
        role: guestRole,
      })
      const token = jwtHelper.prepareToken(req.headers, {
        userId: user._id,
        fullName: user.fullName,
        roleId: guestRole,
      })
      res.json({
        success: true,
        data: {
          token,
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      })
    }
  }
  static async login(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      })
    }

    const { email, password } = req.body

    try {
      const user = await UserManager.findOne({ email: { $eq: email } }, {}, [
        "role",
      ])
      if (!user)
        return res
          .status(401)
          .json({ success: false, msg: "Invalid email or password" })

      const isMatch = await user.validatePassword(password)
      if (!isMatch)
        return res
          .status(401)
          .json({ success: false, msg: "Invalid email or password" })

      const token = jwtHelper.prepareToken(req.headers, {
        userId: user._id,
        fullName: user.fullName,
        roleId: user.role._id,
      })

      res.json({
        success: true,
        data: {
          token,
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      })
    }
  }
  static async getPagesPermissions(req, res) {
    const userId = req.params.id
    try {
      const user = await UserManager.findById(userId, {}, ["role"])
      if (!user)
        return res.status(404).json({ success: false, msg: "User not found" })
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

  static async generateResetToken(req, res) {
    //TODO: change link for frontend link
    const { email } = req.body
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
      const resetLink = `${config.baseUrl}/auth/reset-password/${user.id}/${resetToken.token}`
      const letterContent = await ejs.renderFile("views/resetPassword.ejs", {
        firstName: user.firstName,
        link: resetLink,
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
    const { userId, token } = req.params

    try {
      const exists = await ResetTokenManager.findOne({
        userId: { $eq: userId },
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
    const { userId, token } = req.params
    const { newPassword } = req.body
    try {
      const exists = await ResetTokenManager.findOne({
        userId: { $eq: userId },
        token: { $eq: token },
      })
      if (!exists)
        return res
          .status(400)
          .json({ success: false, msg: "Invalid link or expired" })

      await UserManager.updateById(userId, { password: newPassword })
      await ResetTokenManager.deleteOne({ token: { $eq: token } })
      res.json({ success: true, msg: "Password has been changed successfully" })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}

export default AuthController
