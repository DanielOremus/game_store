import { Router } from "express"
import UserController from "../controllers/UserController.mjs"
const router = Router()
import {
  ensureAuthenticated,
  getPermissionChecker,
  conditionalUserScope,
} from "../../../middlewares/auth.mjs"

const checkPermission = getPermissionChecker("users")

router.use(ensureAuthenticated)

router.get("/", checkPermission("read"), UserController.getAllProfiles)

router.get(
  "/:id",
  conditionalUserScope,
  checkPermission("read"),
  UserController.getProfileById
)
//Creating profile by admin
router.post("/create", checkPermission("create"), UserController.createProfile)

router.put(
  "/update/:id",
  checkPermission("update"),
  UserController.updateProfileById
)

router.delete(
  "/:id",
  conditionalUserScope,
  checkPermission("delete"),
  UserController.deleteProfileById
)

export default router
