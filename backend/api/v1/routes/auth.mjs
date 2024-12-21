import { Router } from "express"
import AuthController from "../controllers/AuthController.mjs"
import { ensureAuthenticated } from "../../../middlewares/auth.mjs"
import { checkSchema } from "express-validator"
import UserValidator from "../validators/UserValidator.mjs"
import AuthValidator from "../validators/AuthValidator.mjs"
const router = Router()

router.get(
  "/get-permissions",
  ensureAuthenticated,
  AuthController.getPagesPermissions
)

router.post(
  "/signup",
  checkSchema(UserValidator.createUserSchema),
  AuthController.signup
)
router.post(
  "/login",
  checkSchema(AuthValidator.loginSchema),
  AuthController.login
)
router.post("/logout", AuthController.logout)

router.post("/reset-password", AuthController.generateResetToken)

router.post(
  "/reset-password/:userId/:tokenId",
  checkSchema(AuthValidator.resetPasswordSchema),
  AuthController.resetPassword
)

export default router
