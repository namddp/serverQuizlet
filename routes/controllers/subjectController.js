const Subject = require("../models/subject");

// Tạo mới môn học
const createSubject = async (req, res) => {
  try {
    const { subjectID, subjectName, subjectIcon } = req.body;
    const newSubject = new Subject({
      subjectID,
      subjectName,
      subjectIcon,
    });

    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Chỉnh sửa môn học
const editSubject = async (req, res) => {
  try {
    const subjectID = req.params.id;
    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectID,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Xóa môn học
const deleteSubject = async (req, res) => {
  try {
    const subjectID = req.params.id;
    await Subject.findByIdAndRemove(subjectID);
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createSubject,
  editSubject,
  deleteSubject,
};
