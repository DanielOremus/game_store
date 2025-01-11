import { validationResult } from "express-validator"
import CartManager from "../models/cart/CartManager.mjs"
import GameManager from "../models/game/GameManager.mjs"

class CartController {
  static async getCartByUserId(req, res) {
    const userId = req.params.userId
    if (!userId)
      return res
        .status(400)
        .json({ success: false, msg: "User id is required" })
    const cart = await CartManager.getDetailsByUserId(userId)
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, msg: "Cart by user id not found" })
    }
    res.json({ success: true, data: { cart } })
  }
  static async addGameToCart(req, res) {
    const { gameId, userId } = req.body

    try {
      const exists = await GameManager.findById(gameId, { _id: 1 })
      if (!exists) {
        return res
          .status(404)
          .json({ success: false, msg: "Game by id not found" })
      }
      console.log("user")

      console.log(req.user._id)

      const cart = await CartManager.addItem(userId, gameId)
      res.json({ success: true, data: { cart } })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async updateGameAmount(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }
    const { gameId, userId, amount } = req.body

    try {
      const cart = await CartManager.updateItemAmount(userId, gameId, amount)
      if (!cart) {
        return res
          .status(404)
          .json({ success: false, msg: "Cart by user id not found" })
      }
      res.json({
        success: true,
        data: {
          cart,
        },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async deleteGameFromCart(req, res) {
    const { gameId, userId } = req.body

    try {
      const cart = await CartManager.deleteItem(userId, gameId)
      res.json({ success: true, data: cart })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}

export default CartController
