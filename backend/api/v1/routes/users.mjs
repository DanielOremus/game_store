import { Router } from "express"
import UserController from "../controllers/UserController.mjs"
import {
  ensureAuthenticated,
  getPermissionChecker,
  conditionalUserScope,
} from "../../../middlewares/auth.mjs"
import { checkSchema } from "express-validator"
import UserValidator from "../validators/UserValidator.mjs"

const checkPermission = getPermissionChecker("users")

const router = Router()

router.use(ensureAuthenticated)

router.get("/", checkPermission("read"), UserController.getAllProfiles)

router.post(
  "/:userId/update-password",
  conditionalUserScope,
  checkPermission("update"),
  checkSchema(UserValidator.updatePasswordSchema),
  UserController.updateProfilePasswordById
)

router.get(
  "/:id",
  conditionalUserScope,
  checkPermission("read"),
  UserController.getProfileById
)
//Creating profile by admin
router.post(
  "/create",
  checkPermission("create"),
  checkSchema(UserValidator.createUserSchema),
  UserController.createProfile
)

router.put(
  "/update/:id",
  checkPermission("update"),
  checkSchema(UserValidator.updateUserSchema),
  UserController.updateProfileById
)

router.delete(
  "/:id",
  conditionalUserScope,
  checkPermission("delete"),
  UserController.deleteProfileById
)

export default router
