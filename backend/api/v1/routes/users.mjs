import { Router } from "express"
import UserController from "../controllers/UserController.mjs"
import {
  ensureAuthenticated,
  getPermissionChecker,
  getAccountOwnerChecker,
  ensureOwner,
} from "../../../middlewares/auth.mjs"
import { checkSchema } from "express-validator"
import UserValidator from "../validators/UserValidator.mjs"

const checkPermission = getPermissionChecker("users")
const skipPermCheckIfOwner = getAccountOwnerChecker()

const router = Router()

router.use(ensureAuthenticated)

router.get("/", checkPermission("read"), UserController.getUsersWithQuery)

router.get(
  "/:id",
  skipPermCheckIfOwner("params", "id"),
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

router.post(
  "/update-email/sendLink",
  ensureAuthenticated,
  checkSchema(UserValidator.updateEmailSchema),
  UserController.generateEmailUpdateToken
)
router.put(
  "/update-email/confirmation",
  ensureAuthenticated,
  UserController.updateProfileEmail
)

router.put(
  "/update/:id",
  skipPermCheckIfOwner("params", "id"),
  checkPermission("update"),
  checkSchema(UserValidator.updateUserSchema),
  UserController.updateProfileById
)

router.put(
  "/update-password",
  ensureAuthenticated,
  checkSchema(UserValidator.updatePasswordSchema),
  UserController.updateProfilePassword
)

router.delete(
  "/",
  skipPermCheckIfOwner("body", "id"),
  checkPermission("delete"),
  UserController.deleteProfileById
)

export default router
