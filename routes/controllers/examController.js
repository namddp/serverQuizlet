import dotenv from "dotenv";
dotenv.config();
import { v4 as uuidv4 } from "uuid";
import Exam from "../../models/Exam.js";


const examController = {
    getExamsByOwner: async(req,res) => {
        const Owner = req.params
        try{
            const Exams = await Exam.find({createdBy : Owner })
            if (!Exams) {
                return res.status(404).json({ error: "Exams not found" });
              }
              res.json(Exams);
            } catch (error) {
              res.status(500).json({ error: "Failed to get Exams" });
            }
    }
}
export default examController;