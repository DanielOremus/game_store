import jwtHelper from "../utils/jwtHelper.mjs"
import RoleManager from "../api/v1/models/role/RoleManager.mjs"

export const getPermissionChecker = (model) => (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const payload = jwtHelper.parseBearer(req.headers)
      if (!payload)
        return res.status(401).json({ success: false, msg: "Unauthorized" })

      const userRole = await RoleManager.findById(payload.roleId)

      req.user = { _id: payload.userId }

      if (req.skipPermissionCheck) return next()

      const hasPermission =
        userRole?.pagesPermissions?.[model][requiredPermission]

      if (!hasPermission)
        return res.status(403).json({ success: false, msg: "Forbidden" })

      next()
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      })
    }
  }
}

export function ensureAuthenticated(req, res, next) {
  try {
    const payload = jwtHelper.parseBearer(req.headers)
    if (!payload)
      return res.status(401).json({ success: false, msg: "Unauthorized" })

    req.user = { _id: payload.userId }

    next()
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    })
  }
}

export function ensureNotAuthenticated(req, res, next) {
  try {
    const payload = jwtHelper.parseBearer(req.headers)
    if (payload)
      return res
        .status(409)
        .json({ success: false, msg: "Already authenticated" })
    next()
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message })
  }
}

export function conditionalUserScope(req, res, next) {
  const id = req.params.id
  if (id === req.user._id.toString()) req.skipPermissionCheck = true
  next()
}
