import { Router } from "express"
import PlatformController from "../controllers/PlatformController.mjs"

const router = Router()

router.get("/", PlatformController.getAllPlatforms)

export default router
