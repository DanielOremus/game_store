import { Router } from "express"
import mainRouter from "./main.mjs"
import usersRouter from "./users.mjs"
const router = Router()

router.use("/", mainRouter)
router.use("/users", usersRouter)

export default router
