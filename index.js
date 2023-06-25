// env
import dotenv from "dotenv";
dotenv.config();

//packages
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// configs
import { connectDB } from "./configs/mongoDB.js";

// routes
import authRouter from "./routes/routers/authRouter.js";

const app = express();
const PORT = process.env.PORT || 5000;

async function main() {
  try {
    // Connect to MongoDB
    await connectDB()

    // Setup middlewares
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());

    // Setup routes
    app.use("/auth", authRouter)

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

//Mock API
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Exam System" });
})

main();
