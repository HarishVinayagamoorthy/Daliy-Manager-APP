import express  from "express"
import UserController from "../controller/UserController.js"
import Auth from "../common/Auth.js"
const router =express.Router()

router.post("/createUser",UserController.CreateUser)
router.get("/getallusers",UserController.GetUsers)
// router.get("/userbyid/:id",Auth.validate,UserController.GetUserById)
router.post("/login",UserController.UserLogin)

export default router