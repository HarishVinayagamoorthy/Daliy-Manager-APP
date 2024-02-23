import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
try {
    mongoose.connect(`${process.env.dburl}/${process.env.dbName}`)
console.log("mongoose connected ")
} catch (error) {
    console.log(error)
    
}
export default mongoose