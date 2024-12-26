import multer from "multer"
import fs from "fs"
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/games")
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null, fileName)
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("File is not an image"), false)
    }
  },
})

const memoryStorage = multer.memoryStorage({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("File is not an image"), false)
    }
  },
})

export const uploadDisk = multer({ storage: diskStorage })
export const uploadMemory = multer({ storage: memoryStorage })
