import { validationResult } from "express-validator"
import GameManager from "../models/game/GameManager.mjs"
import FileManager from "../../../utils/FileManager.mjs"

class GameController {
  static startPage = 0
  static defaultPerPage = 8
  static async getGamesWithQuery(req, res) {
    if (!isFinite(req.query.page)) req.query.page = GameController.startPage
    if (!isFinite(req.query.perPage))
      req.query.perPage = GameController.defaultPerPage

    const reqQuery = req.query
    try {
      const { count, documents } = await GameManager.findManyWithSearchOptions(
        reqQuery,
        { genre: 0, gallerySrc: 0, description: 0 },
        ["platform"]
      )
      res.json({
        success: true,
        data: {
          games: documents,
          count,
        },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async getAllGames(req, res) {
    try {
      const { count, documents } = await GameManager.getAll()
      res.json({
        success: true,
        data: {
          count,
          games: documents,
        },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async getGameById(req, res) {
    const id = req.params.id
    try {
      const game = await GameManager.findById(id, {}, ["platform", "genre"])
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
      FileManager.removeSync(req?.file?.path)
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      })
    }
    let game = null
    const id = req.params.id
    const { name, description, price, sale, genre, platform, releaseDate } =
      req.body

    let mainImgSrc = null
    let statusCode = null
    try {
      if (id) {
        game = await GameManager.findById(id)
        if (!game)
          res.status(404).json({ success: false, msg: "Game by id not found" })
        if (req.file) {
          FileManager.removeSync(game.mainImgSrc)
          mainImgSrc = req.file.path
        }
        game = await GameManager.updateById(id, {
          mainImgSrc: mainImgSrc ?? game.mainImgSrc,
          name,
          description,
          price,
          sale,
          genre,
          platform,
          releaseDate,
        })
        statusCode = 200
      } else {
        mainImgSrc = req.file?.path
        game = await GameManager.create({
          mainImgSrc,
          name,
          description,
          price,
          sale,
          genre,
          platform,
          releaseDate,
        })
        statusCode = 201
      }
      res.status(statusCode).json({
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

  static async updateGalleryByGameId(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      })
    }

    const id = req.params.id

    const galleryObjects = req.files?.map((file) => ({
      src: file.path,
      mimetype: file.mimetype,
    }))
    try {
      const updateGame = await GameManager.updateById(id, {
        $push: { gallery: { $each: galleryObjects } },
      })

      if (!updateGame) {
        return res
          .status(404)
          .json({ success: false, msg: "Game by id not found" })
      }

      res.json({ success: true, game: updateGame })
    } catch (error) {
      galleryPaths.forEach((path) => FileManager.removeSync(path))

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
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}

export default GameController
