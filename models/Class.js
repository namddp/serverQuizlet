import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ClassSchema = new Schema({
  // classID: { type: String, required: true },
  createdBy: { type: String, required: true },
  className: { type: String, required: true },
  studentList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  upComingExams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
});

const Class = mongoose.model("Class", ClassSchema);
export default Class;
