import { Router } from "express"
import UserController from "../controllers/UserController.mjs"
import {
  ensureAuthenticated,
  getPermissionChecker,
  getAccountOwnerChecker,
} from "../../../middlewares/auth.mjs"
import { checkSchema } from "express-validator"
import UserValidator from "../validators/UserValidator.mjs"

const checkPermission = getPermissionChecker("users")
const skipCheckIfOwner = getAccountOwnerChecker()

const router = Router()

router.use(ensureAuthenticated)

router.get("/", checkPermission("read"), UserController.getAllProfiles)

router.post(
  "/:userId/update-password",
  skipCheckIfOwner("params", "userId"),
  checkPermission("update"),
  checkSchema(UserValidator.updatePasswordSchema),
  UserController.updateProfilePasswordById
)

router.get(
  "/:id",
  skipCheckIfOwner("params", "id"),
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
  skipCheckIfOwner("params", "id"),
  checkPermission("delete"),
  UserController.deleteProfileById
)

export default router
