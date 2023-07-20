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
import questionsRouter from "./routes/routers/questionsRouter.js";
import examsRouter from "./routes/routers/examsRouter.js";
import subjectRouter from "./routes/routers/subjectRouter.js"
import searchRouter from "./routes/routers/searchRouter.js";
import classRouter from "./routes/routers/classRouter.js";
import userResourceRouter from "./routes/routers/userResourceRouter.js";

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
    app.use("/auth", authRouter);
    app.use("/questions", questionsRouter);
    app.use("/exams", examsRouter);
    app.use("/subject",subjectRouter)
    app.use("/search", searchRouter)
    app.use("/class", classRouter)
    app.use("user", userResourceRouter)
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
