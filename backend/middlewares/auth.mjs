export const getPermissionChecker = (model) => (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ success: false, msg: "Unauthorized" })
    if (req.skipPermissionCheck) return next()

    const hasPermission =
      req.user?.role?.pagesPermissions?.[model][requiredPermission]

    if (!hasPermission)
      return res.status(403).json({ success: false, msg: "Forbidden" })

    next()
  }
}

export function ensureAuthenticated(req, res, next) {
  if (!req.user)
    return res.status(401).json({ success: false, msg: "Unauthorized" })
  next()
}

export function ensureNotAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return res
      .status(409)
      .json({ success: false, msg: "Already authenticated" })
  next()
}

export const getAccountOwnerChecker = () => (fieldSource, userIdFieldName) => {
  return (req, res, next) => {
    const id = req[fieldSource][userIdFieldName]
    if (id === req.user?._id.toString()) {
      req.isOwner = true
      req.skipPermissionCheck = true
    }
    next()
  }
}
export function ensureOwner(req, res, next) {
  if (!req.isOwner) {
    return res.status(403).json({ success: false, msg: "Forbidden" })
  }
  next()
}
