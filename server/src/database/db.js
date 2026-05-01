import mongoose from "mongoose";



export const connectDB = async(MONGO_URI) => {
     try{
          const connection = await mongoose.connect(MONGO_URI);
          console.log("MongoDB connected successfully host: ",connection.connections[0].host);
     } catch (error) {
          console.error("Error connecting to MongoDB:", error);
          process.exit(1);
     }
}
