import { validationResult } from "express-validator"
import RoleManager from "../models/role/RoleManager.mjs"
import UserManager from "../models/user/UserManager.mjs"

class RoleController {
  static async getAllRoles(req, res) {
    try {
      const { count, documents } = await RoleManager.findMany()
      res.json({
        success: true,
        data: {
          roles: documents,
          count,
        },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async getRoleByUserId(req, res) {
    const userId = req.params.id
    try {
      if (!userId) {
        const guestRole = await RoleManager.findOne({ title: "Guest" })
        return res.json({
          success: true,
          data: { role: guestRole },
        })
      }
      const user = await UserManager.findById(userId, {}, ["role"])
      if (!user)
        return res.status(404).json({ success: false, msg: "User not found" })
      res.json({
        success: true,
        data: {
          role: user.role,
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      })
    }
  }
  static async createOrUpdateRoleById(req, res) {
    //TODO: add validation
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ success: false, errors: errors.array() })
    // }
    const id = req.params.id
    const { title, pagesPermissions } = req.body
    let role = null
    try {
      if (id) {
        role = await RoleManager.updateById(id, {
          title,
          pagesPermissions,
        })
        if (!role)
          return res
            .status(404)
            .json({ success: false, msg: "Role by id not found" })
      } else {
        role = await RoleManager.create({ title, pagesPermissions })
      }
      res.json({ success: true, data: { role } })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async deleteRoleById(req, res) {
    const id = req.params.id
    try {
      const role = await RoleManager.deleteById(id)
      if (!role)
        res.status(404).json({ success: false, msg: "Role by id not found" })
      res.json({ success: true, msg: "Role was removed successfully" })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}

export default RoleController
