import UserResource from "../../models/userResource.js"

const userResourceController = {
// Tạo mới thư mục
 createFolder : async (req, res) => {
  try {
    const { folderID, folderName, questions, exams } = req.body;
    const newFolder = new UserResource({
      folderID,
      folderName,
      questions,
      exams,
    });

    const savedFolder = await newFolder.save();
    res.status(201).json(savedFolder);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
},

// Hiển thị các đề thi đang soạn thảo (Drafting exams)
 showDraftingExams : async (req, res) => {
  try {
    const draftingExams = await UserResource.findOne({ folderName: "myExams" })
      .populate("exams", "-questionsList")
      .exec();
    res.status(200).json(draftingExams);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
},

// Lưu câu hỏi (Save question)
 saveQuestion : async (req, res) => {
  try {
    const folderID = req.params.folderID;
    const questionID = req.body.questionID;

    const updatedFolder = await UserResource.findByIdAndUpdate(
      folderID,
      { $addToSet: { questions: questionID } },
      { new: true }
    );
    res.status(200).json(updatedFolder);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
},

// Xóa câu hỏi đã lưu (Delete saved question)
 deleteSavedQuestion : async (req, res) => {
  try {
    const folderID = req.params.folderID;
    const questionID = req.body.questionID;

    const updatedFolder = await UserResource.findByIdAndUpdate(
      folderID,
      { $pull: { questions: questionID } },
      { new: true }
    );
    res.status(200).json(updatedFolder);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
},

// Lưu đề thi (Save exam)
 saveExam : async (req, res) => {
  try {
    const folderID = req.params.folderID;
    const examID = req.body.examID;

    const updatedFolder = await UserResource.findByIdAndUpdate(
      folderID,
      { $addToSet: { exams: examID } },
      { new: true }
    );
    res.status(200).json(updatedFolder);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
},

// Xóa đề thi đã lưu (Delete saved exam)
 deleteSavedExam : async (req, res) => {
  try {
    const folderID = req.params.folderID;
    const examID = req.body.examID;

    const updatedFolder = await UserResource.findByIdAndUpdate(
      folderID,
      { $pull: { exams: examID } },
      { new: true }
    );
    res.status(200).json(updatedFolder);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
},

// Xóa thư mục
 deleteFolder : async (req, res) => {
  try {
    const folderID = req.params.folderID;
    await UserResource.findByIdAndRemove(folderID);
    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
},
}

export default userResourceController