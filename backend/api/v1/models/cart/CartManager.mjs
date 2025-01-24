import Cart from "./Cart.mjs"
import MongooseManager from "../MongooseManager.mjs"
import GameManager from "../game/GameManager.mjs"
class CartManager extends MongooseManager {
  async getDetailsByUserId(userId) {
    try {
      const cart = await super.findOne({ userId: { $eq: userId } })
      await cart.populate([
        {
          path: "games.game",
          populate: {
            path: "platform",
          },
        },
        { path: "games.selectedPlatform" },
      ])
      return cart
    } catch (error) {
      throw error
    }
  }
  async addItem(userId, itemId) {
    try {
      let cart = await super.findOne({ userId: { $eq: userId } })

      const itemIndex = cart.games.findIndex(
        (obj) => obj.game.toString() === itemId.toString()
      )
      if (itemIndex === -1) {
        const game = await GameManager.findById(itemId, { platform: 1 }, [
          "platform",
        ])

        cart.games.push({
          game: itemId,
          amount: 1,
          selectedPlatform: game.platform[0]._id,
        })
      } else {
        cart.games[itemIndex].amount += 1
      }
      cart = await cart.save()
      // await cart.populate([
      //   {
      //     path: "games.game",
      //     populate: {
      //       path: "platform",
      //     },
      //   },
      //   { path: "games.selectedPlatform" },
      // ])
      return cart
    } catch (error) {
      throw error
    }
  }
  async updateItemAmount(userId, itemId, newAmount) {
    try {
      return await Cart.findOneAndUpdate(
        {
          userId: { $eq: userId },
          "games.game": { $eq: itemId },
        },
        {
          $set: {
            "games.$.amount": newAmount,
          },
        },
        {
          runValidators: true,
          new: true,
        }
      )
    } catch (error) {
      throw error
    }
  }
  async deleteItem(userId, itemId) {
    try {
      const cart = await Cart.findOneAndUpdate(
        { userId: { $eq: userId } },
        { $pull: { games: { game: itemId } } },
        { new: true }
      )
      return cart
    } catch (error) {
      throw error
    }
  }
}

export default new CartManager(Cart)
