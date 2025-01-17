import { Router } from "express"
import RoleController from "../controllers/RoleController.mjs"
import { getPermissionChecker } from "../../../middlewares/auth.mjs"
const checkPermissions = getPermissionChecker("roles")

const router = Router()

router.get("/", checkPermissions("read"), RoleController.getAllRoles)

export default router
