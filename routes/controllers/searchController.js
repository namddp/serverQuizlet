const Subject = require("../models/subject");
const Question = require("../models/question");
const Exam = require("../models/exam");

// Tìm kiếm môn học
const searchSubjects = async (req, res) => {
  try {
    const { keyword } = req.query;
    const regex = new RegExp(keyword, "i");

    const subjects = await Subject.find({ subjectName: { $regex: regex } });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Tìm kiếm câu hỏi
const searchQuestions = async (req, res) => {
  try {
    const { keyword } = req.query;
    const regex = new RegExp(keyword, "i");

    const questions = await Question.find({ content: { $regex: regex } });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Tìm kiếm đề thi
const searchExams = async (req, res) => {
  try {
    const { keyword } = req.query;
    const regex = new RegExp(keyword, "i");

    const exams = await Exam.find({ title: { $regex: regex } });
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  searchSubjects,
  searchQuestions,
  searchExams,
};
