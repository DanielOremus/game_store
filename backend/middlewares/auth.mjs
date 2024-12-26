export const getPermissionChecker = (model) => (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ success: false, msg: "Unauthorized" })
    console.log(req.user)
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

export function conditionalUserScope(req, res, next) {
  const id = req.params.id
  if (id === req.user._id.toString()) req.skipPermissionCheck = true
  next()
}
