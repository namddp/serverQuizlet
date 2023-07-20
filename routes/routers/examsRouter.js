import express from "express";
import examController from "../controllers/examController.js";
const examsRouter = express.Router();

examsRouter.post("/", examController.createExam);

examsRouter.put("/:id", examController.updateExam);

examsRouter.get("/", examController.findExamsByCreatedBy);

examsRouter.delete("/:id", examController.deleteExam);

examsRouter.post("/share/:id", examController.shareExam);

export default examsRouter;
