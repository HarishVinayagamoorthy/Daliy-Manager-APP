import UserModel from "../models/user.js"
import Auth from "../common/Auth.js"
import { response } from "express";

const CreateUser = async (req, res) => {
    try {
      const existingUserByEmail = await UserModel.findOne({ email: req.body.email });
      const existingUserByUsername = await UserModel.findOne({ username: req.body.username });
  
      if (!existingUserByEmail && !existingUserByUsername) {
        req.body.password = await Auth.hashPassword(req.body.password);
        await UserModel.create(req.body);
        res.status(201).json({ message: "User Created Successfully" });
      } else if (existingUserByUsername) {
        res.status(400).json({ message: `User with ${req.body.username} already exists` });
      } else {
        res.status(400).json({ message: `User with ${req.body.email} already exists` });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


  const GetUsers = async (req,res)=>{
 
    try {
      const users = await UserModel.find({},{password:0})
      if(!users){
        res.status(404).json({message:"No users found"})
      }
      res.status(200).json({message:"Users Data Fetch successfully",users})
    } catch (error) {
      
      console.error("Error Fetch users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }  



// const GetUserById=async(req,res)=>{
// try {
// const {id}=req.params
// const user = await UserModel.findById(id).populate("todos")
// if(!user){
//   res.status(404).json({message:"User Not Found"})
// }
// else{
//   res.status(200).json({message:"User Data Fetch Successfully",user})
// }
  
// } catch (error) {
//   console.error("Error fetch user:", error)
//   response.status(500).json({error:"Internal Server Error"})

// }
// }




const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (user) {
      let hashCompare = await Auth.hashCompare(password, user.password);

      if (hashCompare) {
        let token = await Auth.createToken({
          id: user._id,
          username: user.username,
          email: user.email,
        });
        let userData = await UserModel.findOne({email:req.body.email},{_id:0,password:0,status:0,createdAt:0,email:0})
        res.status(200).send({
          message: "Login Successfully",
          token,
          userData
        });
      } else {
        res.status(400).send({
          message: "Invalid password",
        });
      }
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};


export default{
    CreateUser,
    GetUsers,
    // GetUserById,
    UserLogin
}