import { Router } from "express"
import PlatformController from "../controllers/PlatformController.mjs"

const router = Router()

router.get("/", PlatformController.getPlatformsWithQuery)
router.get("/all", PlatformController.getAllPlatforms)

export default router
