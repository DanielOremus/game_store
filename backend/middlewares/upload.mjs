import multer from "multer"

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/games")
  },

  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null, fileName)
  },
})

const memoryStorage = multer.memoryStorage()

export const uploadDisk = multer({
  storage: diskStorage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
  },
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true)
    } else {
      cb(new Error("File is not an image/video", 400), false)
    }
  },
})
export const uploadMemory = multer({
  storage: memoryStorage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("File is not an image"), false)
    }
  },
})
