import { Router } from "express"
import mainRouter from "./main.mjs"
import usersRouter from "./users.mjs"
import authRouter from "./auth.mjs"
import gameRouter from "./game.mjs"
import platformRouter from "./platform.mjs"
import genreRouter from "./genre.mjs"
import cartRouter from "./cart.mjs"
import roleRouter from "./role.mjs"

const router = Router()

router.use("/", mainRouter)
router.use("/users", usersRouter)
router.use("/auth", authRouter)
router.use("/games", gameRouter)
router.use("/platforms", platformRouter)
router.use("/genres", genreRouter)
router.use("/carts", cartRouter)
router.use("/roles", roleRouter)

export default router
