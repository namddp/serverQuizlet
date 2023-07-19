const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

// Endpoint: Tìm kiếm môn học
router.get("/searchSubjects", searchController.searchSubjects);

// Endpoint: Tìm kiếm câu hỏi
router.get("/searchQuestions", searchController.searchQuestions);

// Endpoint: Tìm kiếm đề thi
router.get("/searchExams", searchController.searchExams);

module.exports = router;
