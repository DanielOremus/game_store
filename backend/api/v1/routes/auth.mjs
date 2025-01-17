import { Router } from "express"
import AuthController from "../controllers/AuthController.mjs"
import {
  ensureAuthenticated,
  getAccountOwnerChecker,
  getPermissionChecker,
  ensureNotAuthenticated,
} from "../../../middlewares/auth.mjs"
import { checkSchema } from "express-validator"
import UserValidator from "../validators/UserValidator.mjs"
import AuthValidator from "../validators/AuthValidator.mjs"

const checkPermission = getPermissionChecker("users")
const skipCheckIfOwner = getAccountOwnerChecker()
const router = Router()

router.get("/check", AuthController.isAuthenticated)

router.get(
  "/:id/get-permissions",
  ensureAuthenticated,
  skipCheckIfOwner("params", "id"),
  checkPermission("read"),
  AuthController.getPagesPermissions
)
router.get("/get-guest-permissions", AuthController.getPagesPermissions)

router.post(
  "/signup",
  ensureNotAuthenticated,
  checkSchema(UserValidator.createUserSchema),
  AuthController.signup
)
router.post(
  "/login",
  ensureNotAuthenticated,
  checkSchema(AuthValidator.loginSchema),
  AuthController.login
)

router.post("/logout", ensureAuthenticated, AuthController.logout)

//TODO: Add email validator
router.post("/reset-password/sendLink", AuthController.generateResetToken)

router.post("/reset-password/validate-token", AuthController.validateResetToken)

router.post(
  "/reset-password",
  checkSchema(AuthValidator.resetPasswordSchema),
  AuthController.resetPassword
)

export default router
