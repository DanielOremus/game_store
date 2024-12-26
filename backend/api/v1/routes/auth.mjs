import { Router } from "express"
import AuthController from "../controllers/AuthController.mjs"
import {
  ensureAuthenticated,
  conditionalUserScope,
  getPermissionChecker,
  ensureNotAuthenticated,
} from "../../../middlewares/auth.mjs"
import { checkSchema } from "express-validator"
import UserValidator from "../validators/UserValidator.mjs"
import AuthValidator from "../validators/AuthValidator.mjs"

const checkPermission = getPermissionChecker("users")

const router = Router()

router.get("/check", AuthController.isAuthenticated)

router.get(
  "/:id/get-permissions",
  ensureAuthenticated,
  conditionalUserScope,
  checkPermission("roles"),
  AuthController.getPagesPermissions
)

router.get("/validate-token/:userId/:token", AuthController.validateResetToken)

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
//Add email validator
router.post("/reset-password", AuthController.generateResetToken)

router.post(
  "/reset-password/:userId/:token",
  checkSchema(AuthValidator.resetPasswordSchema),
  AuthController.resetPassword
)

export default router
