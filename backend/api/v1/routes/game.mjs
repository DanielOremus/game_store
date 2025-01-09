import { Router } from "express"
import GameController from "../controllers/GameController.mjs"
import { checkSchema } from "express-validator"
import GameValidator from "../validators/GameValidator.mjs"
import { uploadDisk } from "../../../middlewares/upload.mjs"
import { getPermissionChecker } from "../../../middlewares/auth.mjs"
import { ensureAuthenticated } from "../../../middlewares/auth.mjs"
import CartController from "../controllers/CartController.mjs"
const checkPermission = getPermissionChecker("games")

const router = Router()

router.get("/", GameController.getGamesWithQuery)

router.get("/cart", ensureAuthenticated, CartController.getCartByUserId)

router.get("/:id", GameController.getGameById)

router.post(
  "/create",
  checkPermission("create"),
  uploadDisk.single("mainImg"),
  checkSchema(GameValidator.schema),
  GameController.createOrUpdateGameById
)

router.post(
  "/add-to-cart/:gameId",
  ensureAuthenticated,
  CartController.addGameToCart
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
  uploadDisk.array("mediaToAdd"),
  GameController.updateGalleryByGameId
)

router.delete("/:id", checkPermission("delete"), GameController.deleteGameById)

router.delete(
  "/delete-from-cart/:gameId",
  ensureAuthenticated,
  CartController.deleteGameFromCart
)

export default router
