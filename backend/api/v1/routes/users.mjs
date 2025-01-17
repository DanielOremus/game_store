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

router.get("/", checkPermission("read"), UserController.getAllProfiles)

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
// router.put(
//   "/update-email/confirmation",
//   ensureAuthenticated,
//   checkSchema(UserValidator.emailConfirmationSchema)
// )

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
  "/:id",
  skipPermCheckIfOwner("params", "id"),
  checkPermission("delete"),
  UserController.deleteProfileById
)

export default router
