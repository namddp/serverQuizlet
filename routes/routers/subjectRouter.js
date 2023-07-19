const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

// Endpoint: Tạo mới môn học
router.post("/createSubject", subjectController.createSubject);

// Endpoint: Sửa thông tin môn học
router.put("/editSubject/:subjectID", subjectController.editSubject);

// Endpoint: Xóa môn học
router.delete("/deleteSubject/:subjectID", subjectController.deleteSubject);

module.exports = router;
