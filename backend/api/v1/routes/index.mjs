import { Router } from "express"
import mainRouter from "./main.mjs"
import usersRouter from "./users.mjs"
import authRouter from "./auth.mjs"
const router = Router()

router.use("/", mainRouter)
router.use("/users", usersRouter)
router.use("/auth", authRouter)

export default router
