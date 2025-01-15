import RoleManager from "../models/role/RoleManager.mjs"

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
}

export default RoleController
