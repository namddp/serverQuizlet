import Subject from "../../models/Subject.js"
import Question from "../../models/Question";
import Exam from "../../models/Exam";
const searchController = {
  searchSubjects : async (req, res) => {
    try {
      const { keyword } = req.query;
      const regex = new RegExp(keyword, "i");
  
      const subjects = await Subject.find({ subjectName: { $regex: regex } });
      res.status(200).json(subjects);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  
  // Tìm kiếm câu hỏi
   searchQuestions : async (req, res) => {
    try {
      const { keyword } = req.query;
      const regex = new RegExp(keyword, "i");
  
      const questions = await Question.find({ content: { $regex: regex } });
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  
  // Tìm kiếm đề thi
   searchExams : async (req, res) => {
    try {
      const { keyword } = req.query;
      const regex = new RegExp(keyword, "i");
  
      const exams = await Exam.find({ title: { $regex: regex } });
      res.status(200).json(exams);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
// Tìm kiếm môn học
export default searchController
