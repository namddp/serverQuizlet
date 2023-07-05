import mongoose from "mongoose";
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  questionID: { type: String, required: true },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isPrivate: { type: Boolean, required: true },
  level: { type: String, enum: ["recog", "comp", "apply"], required: true },
  type: { type: String, enum: ["one", "many", "essay"], required: true },
  content: { type: String, required: true },
  description: { type: String, default: null },
  illustration: { type: String, default: null },
  answer: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      illustration: { type: String, default: null },
      iscorrect: { type: Boolean, required: true },
    },
  ],
  explaination: {
    text: { type: String, required: true },
    illustration: { type: String, default: null },
  },
  questionScore: { type: Number, default: null },
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
