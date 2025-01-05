import { Router } from "express"
import GameController from "../controllers/GameController.mjs"
import { checkSchema } from "express-validator"
import GameValidator from "../validators/GameValidator.mjs"
import { uploadDisk } from "../../../middlewares/upload.mjs"
import { getPermissionChecker } from "../../../middlewares/auth.mjs"
const checkPermission = getPermissionChecker("games")

const router = Router()

router.get("/", GameController.getGamesWithQuery)

router.get("/:id", GameController.getGameById)

router.post(
  "/create",
  checkPermission("create"),
  uploadDisk.single("mainImg"),
  checkSchema(GameValidator.schema),
  GameController.createOrUpdateGameById
)

router.put(
  "/update/:id",
  checkPermission("update"),
  uploadDisk.single("mainImg"),
  checkSchema(GameValidator.schema),
  GameController.createOrUpdateGameById
)

router.put(
  "/update-gallery/:id",
  checkPermission("update"),
  uploadDisk.array("gallery", 5),
  checkSchema(GameValidator.gallerySchema),
  GameController.updateGalleryByGameId
)

router.delete("/:id", checkPermission("delete"), GameController.deleteGameById)

export default router
