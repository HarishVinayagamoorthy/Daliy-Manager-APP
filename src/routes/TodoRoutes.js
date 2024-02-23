import express from "express"
import TodoController from "../controller/TodoController.js"
import Auth from "../common/auth.js"

const router=express.Router()


router.get('/get',Auth.validate,TodoController.getTodosByUserId )

router.post('/create',Auth.validate,TodoController.createtodo)
router.put('/update/:id',Auth.validate,TodoController.UpdatedStatus)

router.delete('/delete/:id',Auth.validate,TodoController.deleteTodo)









export default router