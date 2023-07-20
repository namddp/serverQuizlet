import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

//Connect to MongoDB
export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
}

//Define Collections
export const usersCollection = mongoose.connection.collection("users");
export const questionsCollection = mongoose.connection.collection("questions");
export const examsCollection = mongoose.connection.collection("exam");

