import { Router } from "express"
import RoleController from "../controllers/RoleController.mjs"
import {
  getPermissionChecker,
  getAccountOwnerChecker,
} from "../../../middlewares/auth.mjs"
import { checkSchema } from "express-validator"
import RoleValidator from "../validators/RoleValidator.mjs"
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
  checkSchema(RoleValidator.schema),
  RoleController.createOrUpdateRoleById
)

router.put(
  "/:id",
  checkPermissions("update"),
  checkSchema(RoleValidator.schema),
  RoleController.createOrUpdateRoleById
)

router.delete("/:id", checkPermissions("delete"), RoleController.deleteRoleById)

export default router
