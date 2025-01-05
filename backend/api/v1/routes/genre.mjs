import { Router } from "express"
import GenreController from "../controllers/GenreController.mjs"

const router = Router()

router.get("/", GenreController.getAllGenres)

export default router
