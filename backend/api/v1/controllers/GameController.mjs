import { validationResult } from "express-validator"
import GameManager from "../models/game/GameManager.mjs"
import FileManager from "../../../utils/FileManager.mjs"

class GameController {
  static async getGamesWithQuery(req, res) {}
  static async getGameById(req, res) {
    const id = req.params.id
    try {
      const game = await GameManager.findById(id, {}, ["platforms"])
      if (!game)
        return res
          .status(404)
          .json({ success: false, msg: "Game by id not found" })
      res.json({
        success: true,
        data: {
          game,
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      })
    }
  }
  static async createOrUpdateGameById(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      FileManager.removeSync(req?.file.path)
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      })
    }
    let game = null
    const id = req.params.id
    const { name, description, price, sale, platforms } = req.body
    console.log("name")

    console.log(name)

    let imgSrc = null
    try {
      if (id) {
        game = await GameManager.findById(id)
        if (!game)
          res.status(404).json({ success: false, msg: "Game by id not found" })
        if (req.file) {
          FileManager.removeSync(game.imgSrc)
          imgSrc = req.file.path
        }
        game = await GameManager.updateById(id, {
          imgSrc: imgSrc ?? game.imgSrc,
          name,
          description,
          price,
          sale,
          platforms,
        })
      } else {
        imgSrc = req.file?.path
        game = await GameManager.create({
          imgSrc,
          name,
          description,
          price,
          sale,
          platforms,
        })
      }
      res.json({
        success: true,
        data: {
          game,
        },
      })
    } catch (error) {
      FileManager.removeSync(req?.file.path)
      res.status(500).json({ success: false, msg: error.message })
    }
  }

  static async deleteGameById(req, res) {
    const id = req.params.id
    try {
      const game = await GameManager.deleteById(id)
      if (!game)
        res.status(404).json({ success: false, msg: "Game by id not found" })
      res.json({ success: true, msg: "Game was removed successfully" })
    } catch (error) {}
  }
}

export default GameController
