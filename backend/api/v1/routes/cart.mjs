import { Router } from "express"
import {
  getPermissionChecker,
  getAccountOwnerChecker,
} from "../../../middlewares/auth.mjs"
import CartController from "../controllers/CartController.mjs"

const checkPermission = getPermissionChecker("carts")
const checkOwner = getAccountOwnerChecker()

const router = Router()

router.get(
  "/:userId",
  checkOwner("params", "userId"),
  checkPermission("read"),
  CartController.getCartByUserId
)

router.post(
  "/add-to-cart",
  checkOwner("body", "userId"),
  checkPermission("update"),
  CartController.addGameToCart
)

router.put(
  "/update-game-amount",
  checkOwner("body", "userId"),
  checkPermission("update"),
  CartController.updateGameAmount
)

router.delete(
  "/delete-from-cart",
  checkOwner("body", "userId"),
  checkPermission("update"),
  CartController.deleteGameFromCart
)

export default router
