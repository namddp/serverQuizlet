import dotenv from "dotenv";
dotenv.config();
import { v4 as uuidv4 } from "uuid";
import Exam from "../../models/Exam.js";

const examController = {
  createExam: async (req, res) => {
    try {
      const {
        subject,
        createdBy,
        isPrivate,
        title,
        type,
        link,
        examDate,
        duration,
        minScore,
        questionsList,
      } = req.body;

      const newExam = await Exam.create({
        subject,
        createdBy,
        isPrivate,
        title,
        type,
        link,
        examDate,
        duration,
        minScore,
        questionsList,
        status: "drafting",
      });

      res.status(201).json(newExam);
    } catch (error) {
      res.status(500).json({ error: "Failed to create exam" });
    }
  },
  updateExam: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        subject,
        isPrivate,
        title,
        type,
        link,
        examDate,
        duration,
        minScore,
        questionsList,
      } = req.body;

      const updatedExam = await Exam.findByIdAndUpdate(
        id,
        {
          subject,
          isPrivate,
          title,
          type,
          link,
          examDate,
          duration,
          minScore,
          questionsList,
        },
        { new: true }
      );

      if (!updatedExam) {
        return res.status(404).json({ error: "Exam not found" });
      }

      res.json(updatedExam);
    } catch (error) {
      res.status(500).json({ error: "Failed to update exam" });
    }
  },
  findExamsByCreatedBy: async (req, res) => {
    try {
      const { createdBy } = req.query;

      const exams = await Exam.find({ createdBy });

      res.json(exams);
    } catch (error) {
      res.status(500).json({ error: "Failed to get exams" });
    }
  },

  deleteExam: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedExam = await Exam.findByIdAndDelete(id);

      if (!deletedExam) {
        return res.status(404).json({ error: "Exam not found" });
      }

      res.json({ message: "Exam deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete exam" });
    }
  },
  shareExam: async (req, res) => {
    try {
      const { id } = req.params;
      const { sharedBy } = req.body;

      const examToShare = await Exam.findById(id);

      if (!examToShare) {
        return res.status(404).json({ error: "Exam not found" });
      }

      const sharedExam = await Exam.create({
        subject: examToShare.subject,
        createdBy: sharedBy,
        isPrivate: examToShare.isPrivate,
        title: examToShare.title,
        type: examToShare.type,
        link: examToShare.link,
        examDate: examToShare.examDate,
        duration: examToShare.duration,
        minScore: examToShare.minScore,
        questionsList: examToShare.questionsList,
        status: "shared",
      });

      res.status(201).json(sharedExam);
    } catch (error) {
      res.status(500).json({ error: "Failed to share exam" });
    }
  },
};

export default examController;
