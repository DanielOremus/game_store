import { validationResult } from "express-validator"
import CartManager from "../models/cart/CartManager.mjs"
import GameManager from "../models/game/GameManager.mjs"

class CartController {
  static async getCartByUserId(req, res) {
    const userId = req.user._id
    const cart = await CartManager.getDetailsByUserId(userId)
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, msg: "Cart by user id not found" })
    }
    res.json({ success: true, data: { cart } })
  }
  static async addGameToCart(req, res) {
    const gameId = req.params.gameId
    try {
      const exists = await GameManager.findById(gameId, { _id: 1 })
      if (!exists) {
        return res
          .status(404)
          .json({ success: false, msg: "Game by id not found" })
      }
      console.log("user")

      console.log(req.user._id)

      const cart = await CartManager.addItem(req.user._id, gameId)
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
    const gameId = req.params.gameId
    const amount = req.body.amount
    try {
      const cart = await CartManager.updateItemAmount(
        req.user._id,
        gameId,
        amount
      )
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
    const gameId = req.params.gameId
    try {
      const cart = await CartManager.deleteItem(req.user._id, gameId)
      res.json({ success: true, data: cart })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}

export default CartController
