const express = require("express");
const router = express.Router();
const userResourcesController = require("../controllers/userResoucesController");

// Endpoint: Tạo mới thư mục
router.post("/createFolder", userResourcesController.createFolder);

// Endpoint: Hiển thị các đề thi đang soạn thảo (Drafting exams)
router.get("/showDraftingExams", userResourcesController.showDraftingExams);

// Endpoint: Lưu câu hỏi (Save question)
router.put("/saveQuestion/:folderID", userResourcesController.saveQuestion);

// Endpoint: Xóa câu hỏi đã lưu (Delete saved question)
router.put(
  "/deleteSavedQuestion/:folderID",
  userResourcesController.deleteSavedQuestion
);

// Endpoint: Lưu đề thi (Save exam)
router.put("/saveExam/:folderID", userResourcesController.saveExam);

// Endpoint: Xóa đề thi đã lưu (Delete saved exam)
router.put(
  "/deleteSavedExam/:folderID",
  userResourcesController.deleteSavedExam
);

// Endpoint: Xóa thư mục
router.delete("/deleteFolder/:folderID", userResourcesController.deleteFolder);

module.exports = router;
