import fs from "fs"
import sharp from "sharp"
class FileManager {
  static removeSync(path) {
    const exists = fs.existsSync(path)
    if (exists) fs.unlinkSync(path)
  }
  static async resizeImgAsync(buffer, width, height) {
    return await sharp(buffer).resize(width, height).toFile()
  }
}

export default FileManager
