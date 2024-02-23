import mongoose from "./index.js";


const todoSchema = new mongoose.Schema({
    todo:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false,
    },
    createdBy:{type:String,required:[true,"Created By is required"]},
})
const Todo = mongoose.model('Todo',todoSchema)
export default Todo