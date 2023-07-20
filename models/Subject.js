import mongoose from "mongoose";
const Schema = mongoose.Schema;
const SubjectSchema = new Schema({
  subjectID: { type: String, required: true },
  subjectName: { type: String, required: true },
  subjectIcon: { type: String },
});

const Subject = mongoose.model("Subject", SubjectSchema);
export default Subject;
