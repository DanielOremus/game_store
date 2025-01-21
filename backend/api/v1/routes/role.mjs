import { Router } from "express"
import RoleController from "../controllers/RoleController.mjs"
import {
  getPermissionChecker,
  getAccountOwnerChecker,
} from "../../../middlewares/auth.mjs"
const checkPermissions = getPermissionChecker("roles")
const skipCheckIfOwner = getAccountOwnerChecker()
const router = Router()

router.get("/", checkPermissions("read"), RoleController.getAllRoles)

router.get("/guest", RoleController.getRoleByUserId)

router.get(
  "/:id",
  skipCheckIfOwner("params", "id"),
  checkPermissions("read"),
  RoleController.getRoleByUserId
)

router.post(
  "/",
  checkPermissions("create"),
  RoleController.createOrUpdateRoleById
)

router.put(
  "/:id",
  checkPermissions("update"),
  RoleController.createOrUpdateRoleById
)

router.delete("/:id", checkPermissions("delete"), RoleController.deleteRoleById)

export default router
