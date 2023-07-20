import express from "express";
import questionController from "../controllers/questionController.js";
const questionsRouter = express.Router();

// Get all questions
questionsRouter.get("/", questionController.getAllQuestions);

// Get a question by ID
questionsRouter.get("/getone/:id", questionController.getQuestionById);

//get all questions of subject
questionsRouter.get("/:subjectID",questionController.getQuestionBySubject)

// Create a new question
questionsRouter.post("/create", questionController.createQuestion);

// Update a question by ID
questionsRouter.put("/update/:id", questionController.updateQuestionById);

// Delete a question by ID
questionsRouter.delete("/delete/:id", questionController.deleteQuestionById);
export default questionsRouter;
