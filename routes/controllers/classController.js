const Class = require("../models/class");

// Tạo mới lớp học
const createClass = async (req, res) => {
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
};

// Chỉnh sửa lớp học
const editClass = async (req, res) => {
  try {
    const classID = req.params.id;
    const updatedClass = await Class.findByIdAndUpdate(classID, req.body, {
      new: true,
    });
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Mời học sinh vào lớp
const inviteStudent = async (req, res) => {
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
};

// Xóa học sinh khỏi lớp
const removeStudent = async (req, res) => {
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
};

// Xóa lớp học
const deleteClass = async (req, res) => {
  try {
    const classID = req.params.id;
    await Class.findByIdAndRemove(classID);
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createClass,
  editClass,
  inviteStudent,
  removeStudent,
  deleteClass,
};
