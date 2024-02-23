import express from "express"
import TodoRouter from "./TodoRoutes.js"
import UserRouter from "./UserRoutes.js"
const router =express.Router()

router.use('/todos',TodoRouter)
router.use('/users',UserRouter)

export default router