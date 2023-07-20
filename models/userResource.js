const mongoose = require("mongoose");

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

module.exports = UserResource;
