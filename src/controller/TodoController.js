import Todo from "../models/Todo.js"




const getTodosByUserId = async (req, res) => {
  try {
    // const userId = req.params.id; // assuming the parameter is named 'id'

    // Find the user by ID and populate the 'todos' array
    const todo = await Todo.find({createdBy:req.headers.userId})

    if (!todo) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Todos retrieved successfully',
      todo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};







const createtodo = async (req, res) => {
  try {
    const { todo } = req.body;
    const userId = req.params.id; // assuming the parameter is named 'id'


    // Create a new todo using the Todo model and associate it with the user's ID
    const createTodo = await Todo.create({ todo,
    createdBy:req.headers.userId});

    // Find the user by ID and push the new todo's ID to the user's 'todos' array
    // const user = await UserModel.findByIdAndUpdate(
    //   userId,
    //   { $push: { todos: createTodo._id } },
    //   { new: true }
    // ).populate('todos'); // Populate the 'todos' array in the user data

    res.status(201).json({
      message: 'TODO Created Successfully',
      createTodo,
      // user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





const deleteTodo =async (req, res) => {
    const { id } = req.params;
    try {
      await Todo.findByIdAndDelete(id);
      res.json({  message:"Todo deleted Successfully",success: true });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


const UpdatedStatus= async(req,res)=>{
  const{id}=req.params
  const {completed}=req.body
  try {
  const todo=await Todo.findById(id)
  if(!todo){
    res.status(400).json({message:"todo not fount"})
  }
  else{
    todo.completed=completed
    await todo.save()
    res.json({message:"Todo Updated succesfully",todo})
  }
 
  } catch (error) {
    
  }

}

export default {
  getTodosByUserId ,
    createtodo,
    deleteTodo,
    UpdatedStatus

}