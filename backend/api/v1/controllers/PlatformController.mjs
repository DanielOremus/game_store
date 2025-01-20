import PlatformManager from "../models/platform/PlatformManager.mjs"

class PlatformController {
  static startPage = 0
  static defaultPerPage = 4
  static async getAllPlatforms(req, res) {
    try {
      const { count, documents } = await PlatformManager.findMany()
      res.json({
        success: true,
        data: {
          platforms: documents,
          count,
        },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async getPlatformsWithQuery(req, res) {
    if (!req.query.page || req.query.page < 0)
      req.query.page = PlatformController.startPage
    if (!req.query.perPage || req.query.perPage < 1)
      req.query.perPage = PlatformController.defaultPerPage
    try {
      const { count, documents } = await PlatformManager.findManyWithQuery(
        req.query
      )

      res.json({
        success: true,
        data: {
          platforms: documents,
          count,
          currentPage: req.query.page,
          perPage: req.query.perPage,
        },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}

export default PlatformController
