import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  examID: { type: String, required: true },
  subject: { type: String, required: true },
  createdBy: { type: String, required: true },
  isPrivate: { type: Boolean, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ["multi", "essay", "mixed"], required: true },
  link: { type: String, default: null },
  examDate: { type: Date, default: null },
  duration: { type: Number, required: true },
  minScore: { type: Number, default: null },
  questionsList: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    },
  ],
  status: {
    type: String,
    enum: ["drafting", "complete", "prepare", "eva", "done"],
    required: true,
  },
});

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
