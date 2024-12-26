import { Router } from "express"
import mainRouter from "./main.mjs"
import usersRouter from "./users.mjs"
import authRouter from "./auth_jwt.mjs"
import gameRouter from "./game.mjs"
const router = Router()

router.use("/", mainRouter)
router.use("/users", usersRouter)
router.use("/auth", authRouter)
router.use("/games", gameRouter)

export default router
