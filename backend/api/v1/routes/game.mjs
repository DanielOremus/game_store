import { Router } from "express"
import GameController from "../controllers/GameController.mjs"
import { checkSchema } from "express-validator"
import GameValidator from "../validators/GameValidator.mjs"
import { uploadDisk } from "../../../middlewares/upload.mjs"
import { getPermissionChecker } from "../../../middlewares/auth.mjs"
import PlatformManager from "../models/platform/PlatformManager.mjs"
const checkPermission = getPermissionChecker("games")

const router = Router()

router.get("/", GameController.getGamesWithQuery)

router.get("/:id", checkPermission("read"), GameController.getGameById)

router.post(
  "/create",
  checkPermission("create"),
  uploadDisk.single("image"),
  checkSchema(GameValidator.schema),
  GameController.createOrUpdateGameById
)

router.put(
  "/update/:id",
  checkPermission("update"),
  uploadDisk.single("image"),
  checkSchema(GameValidator.schema),
  GameController.createOrUpdateGameById
)

router.delete("/:id", checkPermission("delete"), GameController.deleteGameById)

export default router
