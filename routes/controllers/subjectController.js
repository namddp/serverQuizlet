import Subject from "../../models/Subject.js";

const subjectController = {
// Tạo mới môn học
 createSubject : async (req, res) => {
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
},

// Chỉnh sửa môn học
 editSubject : async (req, res) => {
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
},

// Xóa môn học
 deleteSubject : async (req, res) => {
  try {
    const subjectID = req.params.id;
    await Subject.findByIdAndRemove(subjectID);
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
},
}


export default subjectController
