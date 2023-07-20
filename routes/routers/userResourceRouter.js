import express from "express";
import userResourceController from "../controllers/userResourceController.js"
const userResourceRouter = express.router()

// Endpoint: Tạo mới thư mục
userResourceRouter.post("/createFolder", userResourceController.createFolder);

// Endpoint: Hiển thị các đề thi đang soạn thảo (Drafting exams)
userResourceRouter.get("/showDraftingExams", userResourceController.showDraftingExams);

// Endpoint: Lưu câu hỏi (Save question)
userResourceRouter.put("/saveQuestion/:folderID", userResourceController.saveQuestion);

// Endpoint: Xóa câu hỏi đã lưu (Delete saved question)
userResourceRouter.put(
  "/deleteSavedQuestion/:folderID",
  userResourceController.deleteSavedQuestion
);

// Endpoint: Lưu đề thi (Save exam)
userResourceRouter.put("/saveExam/:folderID", userResourceController.saveExam);

// Endpoint: Xóa đề thi đã lưu (Delete saved exam)
userResourceRouter.put(
  "/deleteSavedExam/:folderID",
  userResourceController.deleteSavedExam
);

// Endpoint: Xóa thư mục
userResourceRouter.delete("/deleteFolder/:folderID", userResourceController.deleteFolder);

export default userResourceRouter
