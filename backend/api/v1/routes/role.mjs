import { Router } from "express"
import RoleController from "../controllers/RoleController.mjs"
import { ensureAuthenticated } from "../../../middlewares/auth.mjs"
const router = Router()

router.get("/", ensureAuthenticated, RoleController.getAllRoles)

export default router
