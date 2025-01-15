import { destroySession, logoutAsync } from "../../../utils/auth.mjs"
import RoleManager from "../models/role/RoleManager.mjs"
import UserManager from "../models/user/UserManager.mjs"
import { validationResult } from "express-validator"

class UserController {
  static async getAllProfiles(req, res) {
    try {
      const { documents, count } = await UserManager.findMany(
        {},
        { password: 0 },
        {},
        ["role"]
      )
      res.json({
        success: true,
        data: {
          users: documents,
          count,
        },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async getProfileById(req, res) {
    const id = req.params.id
    try {
      const user = await UserManager.findById(id, { password: 0 }, ["role"])

      if (!user)
        return res.status(404).json({ success: false, msg: "User not found" })

      res.json({
        success: true,
        data: {
          user,
        },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async createProfile(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { email, firstName, lastName, password, role: roleId } = req.body

    try {
      const role = await RoleManager.findById(roleId, { _id: 1 }, [])
      if (!role)
        return res.status(404).json({ success: true, msg: "Role not found" })

      const user = await UserManager.create({
        email,
        firstName,
        lastName,
        password,
        role,
      })
      const userResponse = user.toObject()
      delete userResponse.password
      res.status(201).json({ success: true, data: { user: userResponse } })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async updateProfileById(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { firstName, lastName, roleId } = req.body
    const id = req.params.id

    try {
      const role = await RoleManager.findById(roleId, { _id: 1 })

      const user = await UserManager.updateById(id, {
        firstName,
        lastName,
        role: role ? role._id : undefined,
      })

      if (!user) {
        return res
          .status(404)
          .json({ success: false, msg: "User by id not found" })
      }

      await user.populate("role")
      const userResponse = user.toObject()
      delete userResponse.password
      res.status(200).json({ success: true, data: { user: userResponse } })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async updateProfileEmail(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { oldEmail, newEmail } = req.body
    const id = req.params.id

    try {
      res.status(200).json({ success: true, data: { user: userResponse } })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async updateProfilePasswordById(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }
    const { newPassword, oldPassword } = req.body
    const id = req.params.userId

    try {
      const user = await UserManager.findById(id)
      console.log(user)

      if (!user) {
        return res
          .status(404)
          .json({ success: false, msg: "User by id not found" })
      }
      const isMatch = await user.validatePassword(oldPassword)
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, msg: "Password is not valid" })
      }
      await UserManager.updateById(id, { password: newPassword })
      res.json({ success: true, msg: "Password was successfully changed" })
    } catch (error) {
      console.log(error)

      return res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async deleteProfileById(req, res) {
    const id = req.params.id

    try {
      const user = await UserManager.deleteById(id)
      if (!user)
        return res.status(404).json({ success: false, msg: "User not found" })

      if (id === req.user?._id.toString()) {
        await logoutAsync(req)
        await destroySession(req)
        res.clearCookie("connect.sid")
        return res.json({ success: true, msg: "Your profile was deleted" })
      }
      res.json({ success: true, msg: "User was successfully deleted" })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}

export default UserController
