import dotenv from "dotenv";
dotenv.config();
import { v4 as uuidv4 } from "uuid";
import Question from "../../models/Question.js";

const questionController = {
  getAllQuestions: async (req, res) => {
    try {
      console.log(Question);
      const questions = await Question.find();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to get questions" });
    }
  },
  getQuestionBySubject: async(req,res) => {
    const { subjectID } = req.params;
    try{
      const questions = await Question.find({subject : subjectID})
          res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to get questions" });
    }
  },

  getQuestionById: async (req, res) => {
    const { id } = req.params;
    try {
      const question = await Question.findOne({ questionID: id });
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      res.status(500).json({ error: "Failed to get question" });
    }
  },
  createQuestion: async (req, res) => {
    try {
      const questionID = uuidv4();
      const {
        subject,
        createdBy,
        isPrivate,
        level,
        type,
        content,
        description,
        illustration,
        answer,
        explaination,
        questionScore,
      } = req.body;

      // Tạo một câu hỏi mới
      const question = new Question({
        questionID,
        subject,
        createdBy,
        isPrivate,
        level,
        type,
        content,
        description,
        illustration,
        answer,
        explaination,
        questionScore,
      });
      const savedQuestion = await question.save();
      res.status(201).json(savedQuestion);
    } catch (error) {
      res.status(500).json({ error: "Failed to create question" });
    }
  },
  updateQuestionById: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedQuestion) {
        return res.status(404).json({ error: "Question not found" });
      }
      res.json(updatedQuestion);
    } catch (error) {
      res.status(500).json({ error: "Failed to update question" });
    }
  },
  deleteQuestionById: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedQuestion = await Question.findByIdAndDelete(id);
      if (!deletedQuestion) {
        return res.status(404).json({ error: "Question not found" });
      }
      res.json({ message: "Question deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete question" });
    }
  },
};

export default questionController;
