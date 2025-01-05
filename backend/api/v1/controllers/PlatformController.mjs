import PlatformManager from "../models/platform/PlatformManager.mjs"

class PlatformController {
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
}

export default PlatformController
