import GenreManager from "../models/genre/GenreManager.mjs"

class GenreController {
  static async getAllGenres(req, res) {
    try {
      const { count, documents } = await GenreManager.findMany()
      res.json({
        success: true,
        data: {
          genres: documents,
          count,
        },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}

export default GenreController
