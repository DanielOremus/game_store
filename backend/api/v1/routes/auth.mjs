import { Router } from "express"
import AuthController from "../controllers/AuthController.mjs"
import { ensureAuthenticated } from "../../../middlewares/auth.mjs"
const router = Router()

router.get(
  "/get-permissions",
  ensureAuthenticated,
  AuthController.getPagesPermissions
)

router.post("/signup", AuthController.signup)
router.post("/login", AuthController.login)
router.post("/logout", AuthController.logout)

export default router
