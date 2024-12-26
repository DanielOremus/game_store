import fs from "fs"
class FileManager {
  static removeSync(path) {
    const exists = fs.existsSync(path)
    if (exists) fs.unlinkSync(path)
  }
}

export default FileManager
