import dotenv from "dotenv";
dotenv.config();
import Class from "../../models/Class.js";

// Tạo mới lớp học
const classController = {
   createClass : async (req, res) => {
    try {
      const { classID, createdBy, className, studentList, upComingExams } =
        req.body;
      const newClass = new Class({
        classID,
        createdBy,
        className,
        studentList,
        upComingExams,
      });
  
      const savedClass = await newClass.save();
      res.status(201).json(savedClass);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  
  // Chỉnh sửa lớp học
   editClass : async (req, res) => {
    try {
      const classID = req.params.id;
      const updatedClass = await Class.findByIdAndUpdate(classID, req.body, {
        new: true,
      });
      res.status(200).json(updatedClass);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  
  // Mời học sinh vào lớp
   inviteStudent : async (req, res) => {
    try {
      const classID = req.params.id;
      const studentID = req.body.studentID;
  
      const updatedClass = await Class.findByIdAndUpdate(
        classID,
        { $addToSet: { studentList: studentID } },
        { new: true }
      );
      res.status(200).json(updatedClass);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  
  // Xóa học sinh khỏi lớp
   removeStudent : async (req, res) => {
    try {
      const classID = req.params.id;
      const studentID = req.body.studentID;
  
      const updatedClass = await Class.findByIdAndUpdate(
        classID,
        { $pull: { studentList: studentID } },
        { new: true }
      );
      res.status(200).json(updatedClass);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  
  // Xóa lớp học
   deleteClass : async (req, res) => {
    try {
      const classID = req.params.id;
      await Class.findByIdAndRemove(classID);
      res.status(200).json({ message: "Class deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },
}


export default classController
