import mongoose from "mongoose";

const userResourcesSchema = new mongoose.Schema({
  folderID: { type: String, required: true },
  folderName: {
    type: String,
    enum: ["myQuestions", "myExams"],
    required: true,
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
});

const UserResource = mongoose.model("UserResources", userResourcesSchema);

export default UserResource
